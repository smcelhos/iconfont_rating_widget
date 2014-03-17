define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin"
], function (declare, lang, html, _WidgetBase, _TemplatedMixin) {

    return declare([_WidgetBase, _TemplatedMixin], {
        
        numStars: 5,
        empty: "&#xe600", // custom icomoon font, empty star
        half: "&#xe601",  // custom icomoon font, half start
		full: "&#xe602",  // custom icomoon font, full star
        value: 0,
        templateString: "<div class='IconFontRater'></div>",
        buildRendering: function () {
            
            var representation = this.buildRepresentation(this.get("value"));
            

            this.inherited(arguments);

            html.set(this.domNode, representation);

        },
        buildRepresentation: function (value) {
            var representation = "";
            
            for (var i = 0; i < this.numStars; i++, value--) {
                if (value >= 1) {
                    representation += this.full;
                }else if (value > 0 && value < 1) {
                    representation += this.half;
                } else {
                    representation += this.empty;
                }

                
            }
            
            return representation;
        },
       
        _setValueAttr: function (value) {
            
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