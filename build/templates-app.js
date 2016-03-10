angular.module('templates-timeline', ['timeline/timeline.html']);

angular.module("timeline/timeline.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("timeline/timeline.html",
    "<ul class=\"experience-timeline\">\n" +
    "    <article>\n" +
    "        <li class=\"tl_company\" ng-repeat-start=\"company in map\" style=\"padding-top:0%;\">\n" +
    "            <span ng-click=\"showCompanyProfileModalFromTitle(company.orgId,company.orgName,company.ticker);\" style=\"font-size:14px;\">{{company.orgName}}</span>\n" +
    "        </li>\n" +
    "        <!--This is for company Executives-->\n" +
    "        <li style=\"list-style-type:none;\" class=\"positions-timeline\" id=\"positions-timeline-executive\" ng-if=\"company.executivePosition\" ng-class=\"{closed: !company.executive.hidden}\">\n" +
    "            <!-- if current is not null-->\n" +
    "            <div class=\"executive-current-existing\" ng-if=\"!(company.executivePosition.current|isEmptyCollection)\">\n" +
    "                <li style=\"list-style-type:none;margin-bottom:-1%;margin-top:-1%;\" ng-repeat=\"position in company.executivePosition.current\">\n" +
    "                    \n" +
    "                    <a ng-if=\"(position|showPopUp)\" href=\"\" class=\"popover-link\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'executive',0,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">\n" +
    "                        <span class=\"title\" style=\"font-size:13px;\">{{position.title}}</span>\n" +
    "                    </a>\n" +
    "                    \n" +
    "                    <a style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:300;\" ng-if=\"(position|showPopUp)\" href=\"\" class=\"popover-link\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'executive-date',0,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">\n" +
    "                        <span style=\"font-family:'Avenir LT Com 45 Book', sans-serif;font-size:13px;\" ng-if=\"position.startDate !== null\"><br>\n" +
    "                            {{position.startDate|localTimeZone|date:'MMMM yyyy'}} - Present</span>\n" +
    "                    </a>\n" +
    "                    \n" +
    "                    <a ng-if=\"!(position|showPopUp)\">\n" +
    "                        <span class=\"title\" style=\"font-family:'Avenir LT Com 45 Book', sans-serif;font-size:13px;font-weight:400;\">{{position.title}}</span>\n" +
    "                    </a>\n" +
    "                    \n" +
    "                    <a ng-if=\"!(position|showPopUp)\">\n" +
    "                        <span ng-if=\"position.startDate !== null\" style=\"font-family:'Avenir LT Com 45 Book', sans-serif;font-size:13px;\"><br>\n" +
    "                            {{position.startDate|localTimeZone|date:'MMMM yyyy'}} - Present</span>\n" +
    "                    </a>\n" +
    "                    \n" +
    "                    <br>\n" +
    "                    <span ng-if=\"!(company.executivePosition.hidden) && !(company.executivePosition.former|isEmptyCollection)\" class=\"expandText\"> \n" +
    "                <a href=\"\" class=\"h17 showHideLink\" style=\"margin-left:0px;\" ng-click=\"company.executivePosition.hidden = !company.executivePosition.hidden\" ng-hide=\"(company.executivePosition.current|isEmptyCollection) || (company.executivePosition.hidden && (company.executivePosition.former|isEmptyCollection))\">More </a>\n" +
    "                </span>\n" +
    "                </li>\n" +
    "                <!--not able to target this div-->\n" +
    "                <div class=\"executive-hidden-more\" style=\"margin-top:-1%;margin-left:0%;\" ng-hide=\"!company.executivePosition.hidden\">\n" +
    "                    <ul class=\"ul-former-positions\" ng-show=\"!(company.executivePosition.current|isEmptyCollection) && !(company.executivePosition.former|isEmptyCollection)\">\n" +
    "                        <a style=\"margin-left:-11%;pointer-events: none;\" class=\"ul-former-positions-a\" href=\"index.html\">\n" +
    "                            <span style=\"font-size:13px;color:#716E6E;\">Former Positions</span></a>\n" +
    "                        <ul class=\"ul-former-positions-ul\" style=\"margin-top:0%;margin-left:-20%;color:#a5a5a5;font-size:13px;\" class=\"minustopMargin8\" ng-show=\"!(company.executivePosition.former|isEmptyCollection)\">\n" +
    "                            <li ng-repeat=\"position in company.executivePosition.former\" style=\"list-style-type: none;\">\n" +
    "                                \n" +
    "                                <a style=\"color: #a5a5a5; font-size: 13px; letter-spacing: 0.02em; font-family: 'Avenir LT Com 45 Book', sans-serif; font-weight: 400;\n" +
    "                               margin-left: 0%;\" ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'executive',$index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.title}}\n" +
    "                                </a>\n" +
    "\n" +
    "                                <a ng-if=\"(position|showPopUp) && (position.startDate !== null || position.endDate !== null)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'executive-date',$index,person,true,company.orgName)\" tabindex=\"0\" popover-placement=\"right\" style=\"color:#a5a5a5;\">\n" +
    "                                    <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\" ng-if=\"position.startDate !== null \">\n" +
    "                                <br>{{position.startDate|localTimeZone|date:'MMMM yyyy'}} - </span>\n" +
    "                                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;color:#a5a5a5;\" ng-if=\"position.startDate === null \">\n" +
    "                                <br>N/A - </span>\n" +
    "                                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;color:#a5a5a5;\" ng-if=\"position.endDate !== null \" class=\"minustopMargin8\" style=\"margin-left: 0% !important;\">{{position.endDate |localTimeZone| date:'MMMM yyyy'}}</span>\n" +
    "                                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;color:#a5a5a5;\" ng-if=\"(position.startDate !== null || position.endDate !== null) && position.endDate == null\" style=\"margin-left: 0% !important;\">N/A</span>\n" +
    "                                </a>\n" +
    "\n" +
    "                                <a ng-if=\"!(position|showPopUp)\" \n" +
    "                                   style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\">{{position.title}}\n" +
    "                               </a>\n" +
    "                                 \n" +
    "                                <a ng-if=\"!(position|showPopUp) && (position.startDate !== null || position.endDate !== null) \">\n" +
    "                                    <span ng-if=\"position.startDate !== null \" class=\"minustopMargin8\" \n" +
    "                                        style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\">\n" +
    "\n" +
    "                                    <br>{{position.startDate|localTimeZone|date:'MMMM yyyy'}} - \n" +
    "                                    </span>\n" +
    "                                    <span ng-if=\"position.startDate === null \" class=\"minustopMargin8\" \n" +
    "                                    style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\">\n" +
    "                                <br>N/A - </span>\n" +
    "                                    <span ng-if=\"position.endDate !== null \" class=\"minustopMargin8\" \n" +
    "                                    style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\">{{position.endDate |localTimeZone| date:'MMMM yyyy'}}</span>\n" +
    "                                    <span ng-if=\"position.endDate == null\" class=\"minustopMargin8\" \n" +
    "                                    style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\">\n" +
    "                                    N/A</span>\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </ul>\n" +
    "                    <div class=\"lessText\"><a class=\"h17\" href=\"\" ng-hide=\"(company.executivePosition.current|isEmptyCollection)\" ng-click=\"company.executivePosition.hidden = !company.executivePosition.hidden\">Less </a></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- if current is null and past is not null-->\n" +
    "            <div class=\"executive-current-nonexisting\" style=\"margin-top:-1%;\" ng-show=\"(company.executivePosition.current|isEmptyCollection) && !(company.executivePosition.former|isEmptyCollection)\">\n" +
    "                <!--show popover -->\n" +
    "                <a href=\"index.html\" style=\" pointer-events: none;cursor: default;font-weight:400;\"><span style=\"font-size:13px;\">Former Positions</span></a>\n" +
    "                <br>\n" +
    "                <span ng-if=\"company.executivePosition.hidden || !(company.executivePosition.former|isEmptyCollection)\" class=\"expandText\"> \n" +
    "            <a href=\"\" class=\"h17 showHideLink\" style=\"margin-left:0px; \" ng-click=\"company.executivePosition.hidden = !company.executivePosition.hidden\" ng-hide=\"company.executivePosition.hidden && !(company.executivePosition.former|isEmptyCollection)\">More </a>\n" +
    "            </span>\n" +
    "                <div class=\"former-executive-hidden-more\" ng-hide=\"!company.executivePosition.hidden\">\n" +
    "                    <!-- Show Current Left Over-->\n" +
    "                    <ul style=\"margin-top:0%;margin-left:-8%;color:#a5a5a5;font-size:13px;\" class=\"executive-past-position\" ng-if=\"!(company.executivePosition.former|isEmptyCollection)\">\n" +
    "                        <li style=\"list-style-type:none;\" ng-repeat=\"position in company.executivePosition.former track by $index\">\n" +
    "                            <!--show popover -->\n" +
    "                            <a style=\"color:#a5a5a5;\" ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'executive',$index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.title}}</a>\n" +
    "                            <a style=\"color:#a5a5a5;\" ng-if=\"(position|showPopUp) && (position.startDate !== null || position.endDate !== null)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'executive-date',$index,person,true,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\" ng-if=\"position.startDate !== null \" class=\"minustopMargin8\">\n" +
    "                                <br>{{position.startDate|localTimeZone|date:'MMMM yyyy'}} - </span>\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\" ng-if=\"position.startDate === null \" class=\"minustopMargin8\">\n" +
    "                                <br>N/A - </span>\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;margin-left: 0% !important;\" ng-if=\"position.endDate !== null \" class=\"minustopMargin8\">{{position.endDate |localTimeZone| date:'MMMM yyyy'}}</span>\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;margin-left: 0% !important;\" ng-if=\"(position.startDate !== null || position.endDate !== null) && position.endDate == null\" class=\"minustopMargin8\">N/A</span>\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"!(position|showPopUp)\" style=\"color:#a5a5a5;\" >{{position.title}}</a>\n" +
    "                            <a ng-if=\"!(position|showPopUp) && (position.startDate !== null || position.endDate !== null) \">\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\" ng-if=\"position.startDate !== null \" class=\"minustopMargin8\">\n" +
    "                                <br>{{position.startDate|localTimeZone|date:'MMMM yyyy'}} - </span>\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:300;\" ng-if=\"position.startDate === null \" class=\"minustopMargin8\">\n" +
    "                                <br>N/A - </span>\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;margin-left: 0% !important;\" ng-if=\"position.endDate !== null \" class=\"minustopMargin8\">{{position.endDate |localTimeZone| date:'MMMM yyyy'}}</span>\n" +
    "                                <span style=\"color:#a5a5a5;font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:300;margin-left: 0% !important;\" ng-if=\"position.endDate == null\" class=\"minustopMargin8\">N/A</span>\n" +
    "                            </a>\n" +
    "                            <!--Not show popover -->\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <!--Show Other Info-->\n" +
    "                    <div class=\"lessText\"><a class=\"h17\" href=\"\" ng-click=\"company.executivePosition.hidden = !company.executivePosition.hidden\">Less</a></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "             <div ng-if=\"!(company.executivePosition.current|isEmptyCollection) || ((company.executivePosition.current|isEmptyCollection) && !(company.executivePosition.former|isEmptyCollection))\"style=\"margin-bottom: 4px;\"></div>\n" +
    "        </li>\n" +
    "        <!--This is for company Board-->\n" +
    "        <li class=\"positions-timeline\" id=\"positions-timeline-board\" ng-repeat-end ng-if=\"company.boardPosition\" ng-class=\"{closed: !company.boardPosition.hidden}\">\n" +
    "            <!-- if current is not null-->\n" +
    "            <div class=\"board-current-existing\" style=\"margin-top:-1%;margin-bottom:-1%;\" ng-if=\"company.boardPosition.current !== null\">\n" +
    "                <a ng-if=\"(company.boardPosition.current.startDateSource|showDatePopUp)\" href=\"\" class=\"popover-link\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.current, 'board', -1,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">\n" +
    "                    <span style=\"font-size:13px;\">Board Member</span>\n" +
    "                    <span ng-if=\"company.boardPosition.current.startDate\" style=\"font-size:13px;\"> <br>\n" +
    "                    {{company.boardPosition.current.startDate|localTimeZone|date:'MMMM yyyy'}} - Present</span>\n" +
    "                </a>\n" +
    "                <a ng-if=\"!(company.boardPosition.current.startDateSource|showDatePopUp)\">\n" +
    "                    <span style=\"font-size:13px;\">Board Member</span>\n" +
    "                    <span ng-if=\"company.boardPosition.current.startDate\" style=\"font-size:13px;\"><br>{{company.boardPosition.current.startDate|localTimeZone|date:'MMMM yyyy'}} - Present</span>\n" +
    "                </a>\n" +
    "                <br>\n" +
    "                <span ng-hide=\"company.boardPosition.hidden || !(\n" +
    "                    !(company.boardPosition.current.positions|isEmptyCollection) || \n" +
    "                    !(company.boardPosition.current.committees|isEmptyCollection) || \n" +
    "                    (company.boardPosition.current.generalInfo.sharesOwnValue|checkUndefinedAndNull) || \n" +
    "                    (company.boardPosition.current.generalInfo.percentage|checkUndefinedAndNull)\n" +
    "                    )\" class=\"expandText\">  \n" +
    "            <a href=\"\" class=\"h17 showHideLink\" ng-click=\"company.boardPosition.hidden = !company.boardPosition.hidden\" \n" +
    "            ng-show=\"!company.boardPosition.hidden\">More</a> \n" +
    "            </span>\n" +
    "                <div class=\"board-hidden-more\" ng-hide=\"!company.boardPosition.hidden\">\n" +
    "                    <!-- Show Current Left Over-->\n" +
    "                    <ul class=\"board-current-position\" ng-if=\"!(company.boardPosition.current.positions|isEmptyCollection)\">\n" +
    "                        <li ng-repeat=\"position in company.boardPosition.current.positions track by $index\" ng-if=\"$index >= 0\">\n" +
    "                            <!--show popover -->\n" +
    "                            <a ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'board', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.title}}</a>\n" +
    "                            <!--Not show popover -->\n" +
    "                            <a ng-if=\"!(position|showPopUp)\" class=\"popover-link\">{{position.title}} </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-current-position\" ng-if=\"!(company.boardPosition.current.committees|isEmptyCollection)\">\n" +
    "                        <li ng-repeat=\"position in company.boardPosition.current.committees track by $index\" ng-if=\"$index >= 0\">\n" +
    "                            <!--show popover -->\n" +
    "                            <a ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'committee', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.committeeType}} {{position.committeeType === 'Pension Committee' ? '' : 'Committee '}}{{position.role === 'Chair' ? 'Chair' : 'Member'}} </a>\n" +
    "                            <!--Not show popover -->\n" +
    "                            <a ng-if=\"!(position|showPopUp)\">{{position.committeeType}} {{position.committeeType === 'Pension Committee' ? '' : 'Committee '}}{{position.role === 'Chair' ? 'Chair' : 'Member'}} </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-past-position\" class=\"minustopMargin8\" ng-if=\"company.boardPosition.current.generalInfo.sharesOwnValue|checkUndefinedAndNull\">\n" +
    "                        <li>\n" +
    "                            <a ng-if=\"(company.boardPosition.current.generalInfo.sharesOwnSource|showPopUpSource) && (company.boardPosition.current.generalInfo.fyeDate|checkUndefinedAndNull)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.current.generalInfo, 'ownership', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.current.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake (as of {{company.boardPosition.current.generalInfo.fyeDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                            <a ng-if=\"(company.boardPosition.current.generalInfo.sharesOwnSource|showPopUpSource) && !(company.boardPosition.current.generalInfo.fyeDate|checkUndefinedAndNull)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.current.generalInfo, 'ownership', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.current.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.current.generalInfo.sharesOwnSource|showPopUpSource) && !(company.boardPosition.current.generalInfo.fyeDate|checkUndefinedAndNull)\"> {{company.boardPosition.current.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.current.generalInfo.sharesOwnSource|showPopUpSource) && (company.boardPosition.current.generalInfo.fyeDate|checkUndefinedAndNull)\"> {{company.boardPosition.current.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake (as of {{company.boardPosition.current.generalInfo.fyeDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-past-position\" class=\"minustopMargin8\" ng-if=\"company.boardPosition.current.generalInfo.percentage|checkUndefinedAndNull\">\n" +
    "                        <li>\n" +
    "                            <a ng-if=\"(company.boardPosition.current.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && (company.boardPosition.current.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.current.generalInfo, 'approval', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.current.generalInfo.percentage * 100 | number:2}}% approval (as of {{company.boardPosition.current.generalInfo.shareholderMeetingDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.current.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && (company.boardPosition.current.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.current.generalInfo, 'approval', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.current.generalInfo.percentage * 100 | number:2}}% approval</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.current.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && !(company.boardPosition.current.generalInfo.votesSource|showPopUpSource)\"> {{company.boardPosition.current.generalInfo.percentage * 100 | number:2}}% approval</a>\n" +
    "                            <a ng-if=\"(company.boardPosition.current.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && !(company.boardPosition.current.generalInfo.votesSource|showPopUpSource)\"> {{company.boardPosition.current.generalInfo.percentage * 100 | number:2}}% approval (as of {{company.boardPosition.current.generalInfo.shareholderMeetingDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <!--Show Other Info-->\n" +
    "                    <!-- Show past Positions-->\n" +
    "                    <ul class=\"formerPositions\" ng-show=\"(company.boardPosition.former|checkUndefinedAndNull) && (!(company.boardPosition.former.positions|isEmptyCollection) || (!(company.boardPosition.former.committees|isEmptyCollection)) || (company.boardPosition.former.generalInfo.sharesOwnValue|checkUndefinedAndNull)|| (company.boardPosition.former.generalInfo.percentage|checkUndefinedAndNull))\">\n" +
    "                        <a href=\"index.html\">\n" +
    "                            <span style=\"font-size:13px;\">Former Positions</span>\n" +
    "                        </a>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-past-position\" class=\"minustopMargin8\" ng-show=\"!(company.boardPosition.former.positions|isEmptyCollection)\">\n" +
    "                        <li ng-repeat=\"position in company.boardPosition.former.positions\">\n" +
    "                            <a ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'board', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{position.title}}</a>\n" +
    "                            <a ng-if=\"!(position|showPopUp)\"> {{position.title}}</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-current-position\" ng-if=\"!(company.boardPosition.former.committees|isEmptyCollection)\">\n" +
    "                        <li ng-repeat=\"position in company.boardPosition.former.committees track by $index\" ng-if=\"$index >= 0\">\n" +
    "                            <!--show popover -->\n" +
    "                            <a ng-if=\"(position|showPopUp)\" id=\"board-position-title\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'committee', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.committeeType}} {{position.committeeType === 'Pension Committee' ? '' : 'Committee '}}{{position.role === 'Chair' ? 'Chair' : 'Member'}} </a>\n" +
    "                            <!--Not show popover -->\n" +
    "                            <a ng-if=\"!(position|showPopUp)\">{{position.committeeType}} {{position.committeeType === 'Pension Committee' ? '' : 'Committee '}}{{position.role === 'Chair' ? 'Chair' : 'Member'}} </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-past-position\" class=\"minustopMargin8\" ng-if=\"company.boardPosition.former.generalInfo.sharesOwnValue|checkUndefinedAndNull\">\n" +
    "                        <li>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && (company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'ownership', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake (as of {{company.boardPosition.former.generalInfo.fyeDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && !(company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'ownership', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && !(company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && (company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake (as of {{company.boardPosition.former.generalInfo.fyeDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"board-past-position\" class=\"minustopMargin8\" ng-if=\"company.boardPosition.former.generalInfo.percentage|checkUndefinedAndNull\">\n" +
    "                        <li>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && (company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'approval', $index,person,true,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval (as of {{company.boardPosition.former.generalInfo.shareholderMeetingDate|localTimeZone|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && (company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'approval', $index,person,true,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval</a>\n" +
    "\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && !(company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval</a>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && !(company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval (as of {{company.boardPosition.former.generalInfo.shareholderMeetingDate|localTimeZone|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <div class=\"lessText\"><a class=\"h17\" href=\"\" ng-click=\"company.boardPosition.hidden = !company.boardPosition.hidden\">Less</a></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- if current is null and past is not null-->\n" +
    "            <div class=\"board-current-nonexisting\" ng-if=\"!(company.boardPosition.current|checkUndefinedAndNull) && (company.boardPosition.former|checkUndefinedAndNull)\">\n" +
    "                <a href=\"\" ng-if=\"(company.boardPosition.former.startDateSource|showDatePopUp) || (company.boardPosition.former.endDateSource|showDatePopUp)\" class=\"popover-link\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former, 'board', -1,person,true,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">\n" +
    "                    <span style=\"font-size:13px;\">Former Board Member \n" +
    "                        <span  style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && company.boardPosition.former.startDate\"><br>{{company.boardPosition.former.startDate|localTimeZone|date : \"MMMM yyyy\"}} - </span>\n" +
    "                        <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && !company.boardPosition.former.startDate\"><br>N/A - </span>\n" +
    "                        <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && company.boardPosition.former.endDate\">{{company.boardPosition.former.endDate|localTimeZone|date : \"MMMM yyyy\"}}</span>\n" +
    "                        <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && !company.boardPosition.former.endDate\">N/A</span>\n" +
    "                    </span>\n" +
    "                </a>\n" +
    "                <a href=\"\" ng-if=\"!(company.boardPosition.former.startDateSource|showDatePopUp) && !(company.boardPosition.former.endDateSource|showDatePopUp)\">\n" +
    "                    <span style=\"font-size:13px;font-family: 'Avenir LT Com 45 Book', sans-serif;font-weight:400;\">Former Board Member </span>\n" +
    "                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" class=\"tl_date\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && company.boardPosition.former.startDate\"><br>{{company.boardPosition.former.startDate|localTimeZone|date : \"MMMM yyyy\"}} - </span>\n" +
    "                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" class=\"tl_date\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && !company.boardPosition.former.startDate\"><br>N/A - </span>\n" +
    "                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" class=\"tl_date\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && company.boardPosition.former.endDate\">{{company.boardPosition.former.endDate|localTimeZone|date : \"MMMM yyyy\"}}</span>\n" +
    "                    <span style=\"font-size:13px;letter-spacing:0.02em;font-family: 'Avenir LT Com 45 Book', sans-serif;\" class=\"tl_date\" ng-if=\"((company.boardPosition.former.startDate|checkUndefinedAndNull) || (company.boardPosition.former.endDate|checkUndefinedAndNull)) && !company.boardPosition.former.endDate\">N/A</span>\n" +
    "                </a>\n" +
    "                <br>\n" +
    "                <span class=\"expandText\">\n" +
    "                    <a href=\"\" class=\"h17 showHideLink\"  ng-click=\"company.boardPosition.former.hidden = !company.boardPosition.former.hidden\" ng-hide=\"company.boardPosition.former.hidden || !(\n" +
    "                    !(company.boardPosition.former.positions|isEmptyCollection) || \n" +
    "                    !(company.boardPosition.former.committees|isEmptyCollection) || \n" +
    "                    (company.boardPosition.former.generalInfo.sharesOwnValue|checkUndefinedAndNull) || \n" +
    "                    (company.boardPosition.former.generalInfo.percentage|checkUndefinedAndNull))\">More</a>\n" +
    "            </span>\n" +
    "                <div class=\"former-board-hidden-more\" ng-hide=\"!company.boardPosition.former.hidden\">\n" +
    "                    <ul class=\"former-board-position-past\" ng-if=\"!(company.boardPosition.former.positions|isEmptyCollection)\">\n" +
    "                        <li ng-repeat=\"position in company.boardPosition.former.positions track by $index\">\n" +
    "                            <a ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'board', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.title}} </a>\n" +
    "                            <a ng-if=\"!(position|showPopUp)\">{{position.title}} </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"former-board-position-past\" ng-if=\"!(company.boardPosition.former.committees|isEmptyCollection)\">\n" +
    "                        <li ng-repeat=\"position in company.boardPosition.former.committees track by $index\">\n" +
    "                            <a ng-if=\"(position|showPopUp)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(position, 'committee', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\">{{position.committeeType}} {{position.committeeType === 'Pension Committee' ? '' : 'Committee '}}{{position.role === 'Chair' ? 'Chair' : 'Member'}}</a>\n" +
    "                            <a ng-if=\"!(position|showPopUp)\">{{position.committeeType}} {{position.committeeType === 'Pension Committee' ? '' : 'Committee '}}{{position.role === 'Chair' ? 'Chair' : 'Member'}}</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"former-board-position-past\" class=\"minustopMargin8\" ng-if=\"company.boardPosition.former.generalInfo.sharesOwnValue|checkUndefinedAndNull\">\n" +
    "                        <li>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && (company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'ownership', $index,person, false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake (as of {{company.boardPosition.former.generalInfo.fyeDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && !(company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\" popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo.sharesOwnSource, 'ownership', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && !(company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.sharesOwnSource|showPopUpSource) && (company.boardPosition.former.generalInfo.fyeDate|checkUndefinedAndNull)\"> {{company.boardPosition.former.generalInfo.sharesOwnValue|currency:\"$\":0}} ownership stake (as of {{company.boardPosition.former.generalInfo.fyeDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <ul class=\"former-board-position-past\" class=\"minustopMargin8\" ng-if=\"company.boardPosition.former.generalInfo.percentage|checkUndefinedAndNull\">\n" +
    "                        <li>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && (company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\"popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'approval', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval (as of {{company.boardPosition.former.generalInfo.shareholderMeetingDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && (company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\" href=\"\" popover-template=\"tmpurl.url\"popover-trigger=\"focus\" ng-focus=\"setReportIssuePopupValues(company.boardPosition.former.generalInfo, 'approval', $index,person,false,company.orgName)\" tabindex=\"0\" popover-placement=\"right\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval</a>\n" +
    "                            <a ng-if=\"!(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && !(company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval</a>\n" +
    "                            <a ng-if=\"(company.boardPosition.former.generalInfo.shareholderMeetingDate|checkUndefinedAndNull) && !(company.boardPosition.former.generalInfo.votesSource|showPopUpSource)\" class=\"popover-link\"> {{company.boardPosition.former.generalInfo.percentage * 100 | number:2}}% approval (as of {{company.boardPosition.former.generalInfo.shareholderMeetingDate|localTimeZone|date:'MM/dd/yyyy'}})</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <div class=\"lessText\"><a class=\"h17\" href=\"\" ng-click=\"company.boardPosition.former.hidden = !company.boardPosition.former.hidden\">Less</a></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </article>\n" +
    "</ul>\n" +
    "");
}]);
