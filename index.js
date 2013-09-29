angular.module('myModule', ['ui.date'])
    .run();

function railtimeCtrl($scope,$timeout,$window,$filter,$interpolate) {
    $scope.debug = true;
    $scope.dateChosen = new Date();
    var format = $filter('date');
    var formatMsg = $interpolate;

    function makeRailtimeUrl(chosenDate,goOrBack) {
        //365 = erembodegem
        //221 = brussel noord
        //"http://www.railtime.be/website/ShowRoutes.aspx?l=NL&smc=1&arrid=365&arrl=NL&depid=221&depl=DE&dep=1&st=2013-09-29T18:11:45&stn=1&tt=0&trty=1"
        //2013-09-29T18:11:45
        var timeInUrl = format($scope.dateChosen,'yyyy-MM-ddTHH:mm:ss');
        var railtimeUrlFormat = "";
        switch(goOrBack) {
            case 'go':
                railtimeUrlFormat = 'http://www.railtime.be/website/ShowRoutes.aspx?l=NL&smc=1&arrid=221&arrl=DE&depid=365&depl=NL&dep=1&st={{txt}}&stn=1&tt=0&trty=1';
                break;
            case 'back':
                railtimeUrlFormat = 'http://www.railtime.be/website/ShowRoutes.aspx?l=NL&smc=1&arrid=365&arrl=NL&depid=221&depl=DE&dep=1&st={{txt}}&stn=1&tt=0&trty=1';
                break;
            default: throw "goOrBack is not 'go' or 'back'"
        }
        var url = formatMsg(railtimeUrlFormat)({txt:timeInUrl});
        $scope.output = url;
        //return "http://www.google.com";
        return url;
    }

    $scope.changeLocation = function(goOrBack) {
        $scope.url = makeRailtimeUrl($scope.dateChosen,goOrBack);
        $window.location.href = $scope.url;
    };

    $scope.today = function() {
        $scope.dateChosen = new Date();
    };

    $scope.open = function() {
        $timeout(function() {
            $scope.opened = true;
            $("[name='dateInput']").datepicker("show");
        });
    };

    $scope.dateOptions = {
        dateFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };

}
