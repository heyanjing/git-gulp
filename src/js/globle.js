var Globle = {
    fun: {
        isBlank:function (text) {
           return (text===undefined||text===null||text==="");
        },
        sub10: function (str) {
            return str.substring(0,10);
        },
        text: function (arr,v) {
            var result = '';
            $.each(arr, function () {
                if (this.value === v) {
                    result = this.text;
                    return false;
                }
            });
            return result;
        },
        warn:function (content) {
            search.warn({content:content});
        },
        info:function (content) {
            search.info({
                content: content,
                funl: function () {
                    $("#closeWindow").click();
                }
            });
        }
    },
    constant: {

        /**
         * 资质等级
         */
        AptitudeLevel: {
            data: [{text: "一级", value: 1}, {text: "二级", value: 2}, {text: "三级", value: 3}, {text: "四级", value: 4}, {text: "五级", value: 5}, {text: "六级", value: 6}, {text: "七级", value: 7}, {text: "八级", value: 8}],
        }
    }
}