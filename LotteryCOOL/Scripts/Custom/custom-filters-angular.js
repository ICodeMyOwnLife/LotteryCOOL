angular.module("filtersModule", [])
    .filter("titlecase", function () {
        return function (data) {
            if (!angular.isString(data)) return data;

            return data.replace(/\S*/g, function (s) {
                return s.charAt(0).toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
            });
        }
    });

