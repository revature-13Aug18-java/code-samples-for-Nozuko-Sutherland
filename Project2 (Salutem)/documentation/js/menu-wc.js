'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">angular-salutem documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' : 'data-target="#xs-components-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' : 'id="xs-components-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/BodyLocationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BodyLocationsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DiagnosisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiagnosisComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/IssuesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IssuesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RedflagComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RedflagComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ReviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SpecialisationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpecialisationsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SymptomsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SymptomsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' : 'data-target="#xs-injectables-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' : 'id="xs-injectables-links-module-AppModule-4a073332153bfd9385a1a4c0de709d5f"' }>
                                        <li class="link">
                                            <a href="injectables/HealthResultService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>HealthResultService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Account.html" data-type="entity-link">Account</a>
                    </li>
                    <li class="link">
                        <a href="classes/BodyLocation.html" data-type="entity-link">BodyLocation</a>
                    </li>
                    <li class="link">
                        <a href="classes/BodySymptom.html" data-type="entity-link">BodySymptom</a>
                    </li>
                    <li class="link">
                        <a href="classes/Diagnosis.html" data-type="entity-link">Diagnosis</a>
                    </li>
                    <li class="link">
                        <a href="classes/Issue.html" data-type="entity-link">Issue</a>
                    </li>
                    <li class="link">
                        <a href="classes/Issue-1.html" data-type="entity-link">Issue</a>
                    </li>
                    <li class="link">
                        <a href="classes/Issue2.html" data-type="entity-link">Issue2</a>
                    </li>
                    <li class="link">
                        <a href="classes/PastSymptom.html" data-type="entity-link">PastSymptom</a>
                    </li>
                    <li class="link">
                        <a href="classes/Specialisation.html" data-type="entity-link">Specialisation</a>
                    </li>
                    <li class="link">
                        <a href="classes/Specialisation-1.html" data-type="entity-link">Specialisation</a>
                    </li>
                    <li class="link">
                        <a href="classes/Submission.html" data-type="entity-link">Submission</a>
                    </li>
                    <li class="link">
                        <a href="classes/Symptom.html" data-type="entity-link">Symptom</a>
                    </li>
                    <li class="link">
                        <a href="classes/TokenForm.html" data-type="entity-link">TokenForm</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/HealthResultService.html" data-type="entity-link">HealthResultService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
