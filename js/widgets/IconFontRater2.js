define([
    "dojo/_base/declare",
    "dojo/_base/lang",
	"dojo/on",
    "dojo/html",
	"dojo/dom-construct",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin"
], function (declare, lang, on, html, domConstruct, _WidgetBase, _TemplatedMixin) {

    return declare([_WidgetBase, _TemplatedMixin], {
        
        numStars: 5, // scale of rating 0 - numStars
        empty: "&#xe600", // character to use for empty, custom icomoon font, empty star
        half: "&#xe601",  // custom icomoon font, half start
		full: "&#xe602",  // custom icomoon font, full star
        value: 0,
        templateString: "<span class='IconFontRater'></span>",
        buildRendering: function () {
            // summary: 
			//		Dijit Lifecycle method.  Build the rendering for this widget.
			//		Not strictly necessary in IconFontRater as I use a templateString along with _TemplatedMixin
			//		and the same basic code resides in value setter, but doesn't hurt.
			
            var representation = this.buildRepresentation(this.get("value"));
			
			// let WidgetBase/TemplatedMixin do their thing
            this.inherited(arguments);

            html.set(this.domNode, representation);

        },
        buildRepresentation: function (value) {
			// summary:
			//		Build a representation of our widget based on the provided value	\
			// value: Number
			//		Numeric value we wish to display.  Negative//zero displayed as zero
			//		Anything greater than the max rating, is displayed as the max ratting.
			//	return: HTMLElement
			//		Internal representation of our widget
			
            var representation = domConstruct.create("span");
            var span = null;
            for (var i = 0; i < this.numStars; i++, value--) {
                if (value >= 1) {
                    span = domConstruct.create("span", {innerHTML:this.full, pos: i});
                }else if (value > 0 && value < 1) {
                    span = domConstruct.create("span", {innerHTML:this.half, pos: i});
                } else {
                    span = domConstruct.create("span", {innerHTML:this.empty, pos: i});
                }
				
				this.own(on(span, "click", this._onClick.bind(this)));
				domConstruct.place(span, representation);
				//representation.append(span);
				
			
                
            }
			
            return representation;
        },
       
	   _onClick: function(evt){
		   // summary: 
		   //		onclick handler for each unit in the Rater widget.
		   //	evt:
			// 		Normalized mouse click event
	   var element = evt.srcElement;
	   var inc = 1;
	   var offsetWidth = element.offsetWidth;
		var offsetLeft = element.offsetLeft;

	   if(evt.x < offsetLeft + offsetWidth/2){
		inc = .5;
	   }
	   
		var elementPos = element.getAttribute('pos');
		
		this.set("value", inc + parseInt(elementPos) );
	
	   },
        _setValueAttr: function (value) {
            // summary:
			//		Value setter, called whenever a value is set on the widget.
			//		Client's should use widget.set("value", value) to ensure proper use in all browsers.
			
            value = parseFloat(value);

            if (value > this.numStars) { // might need to do special logic to zero out if needed
                value = this.numStars;
            }
            var representation = this.buildRepresentation(value);

            html.set(this.domNode, representation);
           

            this._set("value", value);

        }
    });

});