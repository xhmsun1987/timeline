(function() {

    angular.module("bsp.timeLine", [
            'templates-timeline'
        ])
        .directive('timeline', ['$rootScope', 'companyProfileService', 'personProfileService', function($rootScope, companyProfileService, personProfileService) {
            return {
                restrict: 'E',
                scope: {
                    map: '=map',
                    tmpurl: '=tmpurl',
                    person: '=person'
                },
                controller: ['$scope', function($scope) {
                    $scope.$on('populatePopover', function(event, args) {
                        $scope.popoverObj = args;
                    });
                    $scope.reportAnIssue = function() { 
                        personProfileService.getReportAnIssue($scope.popoverObj);
                    };
                }],
                controllerAs: 'PopoverCtrl',
                link: function(scope) {
                    scope.setReportIssuePopupValues =
                        function(content, isFromConnection, index, person, isFormer, organizationName) {
                            content.isFromConnection = isFromConnection; 
                            if (index !== undefined) {
                                content.index = index;
                            }
                            if (isFormer !== undefined) {
                                content.isFormer = isFormer;
                            }
                            if (organizationName !== undefined) {
                                content.organizationName = organizationName;
                            }
                            if (person !== undefined) {
                                content.personName = person.details[0].name.fullName;
                            } 
                            $rootScope.$broadcast('populatePopover', content); 
                        };
                    scope.showCompanyProfileModalFromTitle = function(companyId, companyName,
                        companyTicker) {
                        var company = {};
                        company.id = companyId;
                        company.name = companyName;
                        company.ticker = companyTicker;
                        companyProfileService.showOrganizationProfileModal(company);
                    };
                },
                templateUrl: '../timeline.html'
            };
        }]);

})();
