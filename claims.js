/* Familiencockpit v0.15 – progressive Anspruchsprüfung mit Folgeansprüchen
   Keine verbindliche Rechts- oder Bewilligungsentscheidung. Regeln Stand 30.09.2026. */

const CLAIMS_VERIFIED='30.09.2026';
const CLAIM_SOURCES={
  kindergeld:'https://familienportal.de/familienportal/familienleistungen/kindergeld/faq/bis-zu-welchem-alter-meines-kindes-bekomme-ich-kindergeld--124966',
  kiz:'https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kiz-lotse',
  but:'https://www.arbeitsagentur.de/familie-und-kinder/informationen-zum-bildungspaket',
  elterngeld:'https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/kann-ich-elterngeld-bekommen--155116',
  mutterschaft:'https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen',
  unterhaltsvorschuss:'https://familienportal.de/familienportal/familienleistungen/unterhaltsvorschuss',
  wohngeld:'https://www.bmwsb.bund.de/SharedDocs/faqs/DE/wohnen/wohngeld/wohngeld-faq-liste.html',
  grundsicherung:'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/voraussetzungen-einkommen-vermoegen',
  alg:'https://www.arbeitsagentur.de/finanzielle-hilfen/anspruch-hoehe-dauer-arbeitslosengeld',
  krankengeld:'https://www.bundesgesundheitsministerium.de/krankengeld/',
  kinderkrankengeld:'https://familienportal.de/familienportal/familienleistungen/weitere-leistungen/kinderkrankentage-und-kinderkrankengeld',
  bab:'https://www.arbeitsagentur.de/bildung/ausbildung/berufsausbildungsbeihilfe-bab',
  bafoeg:'https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99022001017003',
  pflege:'https://www.bundesgesundheitsministerium.de/pflege-zu-hause/leistungen-bei-pflegegrad-1',
  pflegegeld:'https://www.bundesgesundheitsministerium.de/pflegegeld',
  em:'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Allgemeine-Informationen/Rentenarten-und-Leistungen/Erwerbsminderungsrente/Erwerbsminderungsrente',
  grundsicherungAlter:'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/In-der-Rente/Grundsicherung',
  witwen:'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/In-der-Rente/Hinterbliebenenrente',
  waisen:'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/In-der-Rente/Hinterbliebenenrente',
  but_ausfluege:'https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Bildungspaket/Leistungen-des-Bildungspakets/leistungen-des-bildungspakets.html',
  but_schulbedarf:'https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Bildungspaket/Leistungen-des-Bildungspakets/leistungen-des-bildungspakets.html',
  but_mittagessen:'https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Bildungspaket/Leistungen-des-Bildungspakets/leistungen-des-bildungspakets.html',
  but_schuelerbefoerderung:'https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Bildungspaket/Leistungen-des-Bildungspakets/leistungen-des-bildungspakets.html',
  but_lernfoerderung:'https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Bildungspaket/Leistungen-des-Bildungspakets/leistungen-des-bildungspakets.html',
  but_teilhabe:'https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Bildungspaket/Leistungen-des-Bildungspakets/leistungen-des-bildungspakets.html',
  kita_beitrag:'https://familienportal.de/familienportal/familienleistungen/kinderzuschlag',
  mutter_kind_stiftung:'https://familienportal.de/familienportal/lebenslagen/schwangerschaft-geburt/staatliche-leistungen',
  erstausstattung_wohnung:'https://www.arbeitsagentur.de/grundsicherung/wohnen',
  erstausstattung_baby:'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/bedarfe',
  mehrbedarf_schwangerschaft:'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/bedarfe',
  mehrbedarf_alleinerziehend:'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/bedarfe',
  rundfunk:'https://www.rundfunkbeitrag.de/ausnahmen-von-der-rundfunkbeitragspflicht',
  wbs:'https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99107022012000',
  wohngeld_lastenzuschuss:'https://www.bmwsb.bund.de/SharedDocs/faqs/DE/wohnen/wohngeld/wohngeld-faq-liste.html',
  gkv_zuzahlung:'https://www.bundesgesundheitsministerium.de/service/begriffe-von-a-z/b/belastungsgrenze',
  haushaltshilfe:'https://www.bundesgesundheitsministerium.de/haushaltshilfe/',
  zahnersatz_haertefall:'https://www.bundesgesundheitsministerium.de/zahnaerztliche-behandlung/seite',
  pflege_entlastung:'https://www.bundesgesundheitsministerium.de/pflege-zu-hause/leistungen-bei-pflegegrad-1',
  pflege_hilfsmittel:'https://www.bundesgesundheitsministerium.de/pflege-zu-hause/pflegehilfsmittel',
  pflege_wohnumfeld:'https://www.bundesgesundheitsministerium.de/pflege-zu-hause/zuschuesse-zur-wohnungsanpassung',
  pflege_ersatzpflege:'https://www.bundesgesundheitsministerium.de/pflege-zu-hause',
  pflegeunterstuetzungsgeld:'https://www.bundesgesundheitsministerium.de/service/begriffe-von-a-z/p/pflegeunterstuetzungsgeld-als-entgeltersatzleistung',
  pflege_pauschbetrag:'https://esth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/IV-Tarif-31-34b/Paragraf-33b/inhalt.html',
  vermittlungsbudget:'https://www.arbeitsagentur.de/vermittlungsbudget',
  mobilitaetszuschuss:'https://www.arbeitsagentur.de/bildung/ausbildung/mobilitaetszuschuss',
  weiterbildungsgeld:'https://www.arbeitsagentur.de/karriere-und-weiterbildung/bildungsgutschein',
  insolvenzgeld:'https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/finanzielle-hilfen/insolvenzgeld-arbeitnehmer',
  kinderbetreuung_steuer:'https://esth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/II-Einkommen-2-24b/5-Sonderausgaben-10-10g/Paragraf-10/paragraf-10.html',
  entlastungsbetrag_alleinerziehend:'https://familienportal.de/familienportal/familienleistungen/steuerentlastungen/was-ist-der-entlastungsbetrag-fuer-alleinerziehende-und-wie-werden-kinderfreibetraege-bei-nicht-verheirateten-eltern-aufgeteilt--125202',
  behinderten_pauschbetrag:'https://esth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/IV-Tarif-31-34b/Paragraf-33b/inhalt.html',
  schwerbehinderten_mobilitaet:'https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99102015149000'
};


const CLAIM_REQUIREMENTS={
  kindergeld:[
    'Kind grundsätzlich unter 18 Jahren; danach nur bei gesetzlich anerkanntem Status, z. B. Ausbildung, Studium, Freiwilligendienst oder bestimmten Übergangs-/Arbeitssuchzeiten.',
    'Die antragstellende Person muss in einem kindergeldrechtlich berücksichtigungsfähigen Verhältnis zum Kind stehen.',
    'Wohnsitz bzw. gewöhnlicher Aufenthalt und grenzüberschreitende Fälle müssen die gesetzlichen Voraussetzungen erfüllen.'
  ],
  kiz:[
    'Für das Kind besteht grundsätzlich Anspruch auf Kindergeld; das Kind lebt im Haushalt und ist in der Regel unter 25 und unverheiratet.',
    'Das Einkommen der Familie reicht für den eigenen Bedarf, aber nicht oder nur knapp für den gesamten Familienbedarf.',
    'Einkommen, Wohnkosten und erhebliches Vermögen werden in der genauen Berechnung berücksichtigt.',
    'Kinderzuschlag ist eine vorrangige Leistung; parallele existenzsichernde Leistungen können den Anspruch beeinflussen.'
  ],
  but:[
    'Ein Kind, Jugendlicher oder junger Erwachsener erfüllt die Voraussetzungen der jeweiligen Bildungs-/Teilhabeleistung.',
    'Im Haushalt wird eine berechtigende Grundleistung bezogen, z. B. Kinderzuschlag, Wohngeld, Grundsicherung oder bestimmte Sozialhilfeleistungen.',
    'Je nach Baustein gelten zusätzliche Bedingungen, etwa Schulbesuch, gemeinschaftliches Mittagessen, Klassenfahrt oder Lernförderbedarf.'
  ],
  elterngeld:[
    'Das Kind lebt im eigenen Haushalt und wird selbst betreut und erzogen.',
    'Wohnsitz bzw. gewöhnlicher Aufenthalt erfüllt die gesetzlichen Voraussetzungen.',
    'Während des Bezugs wird grundsätzlich höchstens 32 Stunden pro Woche gearbeitet.',
    'Die maßgebliche Einkommensgrenze wird nicht überschritten und der Antrag betrifft einen zulässigen Lebensmonat des Kindes.'
  ],
  mutterschaft:[
    'Es besteht eine Schwangerschaft bzw. ein Zeitraum, für den Mutterschaftsleistungen vorgesehen sind.',
    'Beschäftigungs- und Krankenversicherungsstatus müssen zu einer Leistung der Krankenkasse oder gegebenenfalls des Bundesamts für Soziale Sicherung führen.',
    'Die konkrete Leistung hängt u. a. davon ab, ob gesetzlich, privat oder familienversichert und ob ein Arbeitsverhältnis besteht.'
  ],
  unterhaltsvorschuss:[
    'Das Kind ist unter 18 Jahre alt und lebt überwiegend bei einem alleinerziehenden Elternteil.',
    'Der andere Elternteil zahlt keinen, zu wenig oder nicht regelmäßig Unterhalt bzw. keinen ausreichenden Waisenbezug.',
    'Bei Kindern von 12 bis 17 Jahren gelten zusätzliche Voraussetzungen zur wirtschaftlichen Situation des Haushalts.',
    'Wohnsitz bzw. gewöhnlicher Aufenthalt des Kindes muss die gesetzlichen Anforderungen erfüllen.'
  ],
  wohngeld:[
    'Es besteht eine berücksichtigungsfähige Mietbelastung oder Belastung aus selbst genutztem Wohneigentum.',
    'Das Gesamteinkommen des Haushalts liegt innerhalb der für Haushaltsgröße und Wohnort maßgeblichen Grenzen.',
    'Haushaltsgröße, berücksichtigungsfähige Miete/Belastung und örtliche Mietenstufe bestimmen den Anspruch mit.',
    'Wer bereits eine Transferleistung erhält, in der Unterkunftskosten berücksichtigt werden, ist häufig vom Wohngeld ausgeschlossen.'
  ],
  grundsicherung:[
    'Die Person ist grundsätzlich erwerbsfähig, also regelmäßig mindestens drei Stunden täglich arbeitsfähig, und im maßgeblichen Alter.',
    'Der gewöhnliche Aufenthalt liegt in Deutschland.',
    'Der Lebensunterhalt kann nicht ausreichend aus eigenem Einkommen und verwertbarem Vermögen gedeckt werden.',
    'Einkommen, Vermögen und die Situation der Bedarfsgemeinschaft werden vollständig geprüft.'
  ],
  alg:[
    'Es liegt Arbeitslosigkeit vor; zugleich besteht grundsätzlich die Möglichkeit, mindestens 15 Stunden pro Woche zu arbeiten.',
    'Die Person hat sich arbeitslos gemeldet und sucht eine versicherungspflichtige Beschäftigung.',
    'Die Anwartschaftszeit ist erfüllt: regelmäßig mindestens 12 Monate Versicherung innerhalb der letzten 30 Monate; Sonderregeln sind möglich.',
    'Die Person steht der Vermittlung zur Verfügung und wirkt bei der Arbeitssuche mit.'
  ],
  krankengeld:[
    'Es besteht eine gesetzliche Krankenversicherung mit Krankengeldanspruch.',
    'Arbeitsunfähigkeit ist ärztlich festgestellt und ohne relevante Lücke nachgewiesen.',
    'Bei Arbeitnehmern ist die Entgeltfortzahlung für denselben Krankheitsfall typischerweise ausgeschöpft; häufig nach sechs Wochen.',
    'Sonderregeln gelten z. B. für Selbstständige, Arbeitslose, stationäre Behandlung oder wiederholte Erkrankungen.'
  ],
  kinderkrankengeld:[
    'Das Kind ist krank und muss betreut, beaufsichtigt oder gepflegt werden; dadurch kann die betreuende Person nicht arbeiten.',
    'Die anspruchstellende Person ist gesetzlich krankenversichert mit entsprechendem Anspruch; für das Kind müssen die versicherungsrechtlichen Voraussetzungen erfüllt sein.',
    'Das Kind ist grundsätzlich unter 12 Jahre alt oder behindert und auf Hilfe angewiesen.',
    'Im Haushalt steht keine andere Person zur Verfügung, die das Kind betreuen kann; ein ärztlicher Nachweis kann erforderlich sein.'
  ],
  bab:[
    'Es handelt sich um eine förderfähige betriebliche oder außerbetriebliche Berufsausbildung bzw. eine andere gesetzlich erfasste Ausbildungssituation.',
    'Die Wohnsituation erfüllt die Voraussetzungen; häufig ist eine auswärtige Unterbringung relevant, wobei Ausnahmen bestehen.',
    'Ausbildungsvergütung und sonstiges Einkommen reichen nicht zur Deckung des anerkannten Bedarfs.',
    'Je nach Fall werden Einkommen der Eltern bzw. Partnerperson und weitere persönliche Voraussetzungen berücksichtigt.'
  ],
  bafoeg:[
    'Schule, Hochschule oder Ausbildung muss nach dem BAföG grundsätzlich förderfähig sein.',
    'Die Ausbildung wird in der erforderlichen Form und grundsätzlich in ausreichendem zeitlichem Umfang betrieben.',
    'Die Altersvoraussetzungen beim Ausbildungsbeginn sind erfüllt oder eine gesetzliche Ausnahme greift.',
    'Eigenes Einkommen/Vermögen und gegebenenfalls Einkommen der Eltern oder Partnerperson führen nach der Berechnung zu einem Förderbedarf.'
  ],
  pflege:[
    'Pflegebedürftigkeit im Sinne der Pflegeversicherung liegt vor und wurde durch die Pflegekasse einem Pflegegrad 1 bis 5 zugeordnet.',
    'Die versicherungsrechtlichen Voraussetzungen der Pflegeversicherung müssen erfüllt sein.',
    'Welche Leistung konkret möglich ist, hängt von Pflegegrad, häuslicher/stationärer Versorgung und gewählter Leistungsart ab.'
  ],
  pflegegeld:[
    'Mindestens Pflegegrad 2 liegt vor.',
    'Die Pflege findet häuslich statt.',
    'Die erforderliche Pflege ist in geeigneter Weise selbst sichergestellt, z. B. durch Angehörige oder andere ehrenamtlich Pflegende.',
    'Bei Kombination mit Pflegesachleistungen kann sich die Höhe des Pflegegelds verändern.'
  ],
  em:[
    'Das gesundheitliche Leistungsvermögen auf dem allgemeinen Arbeitsmarkt ist rentenrechtlich erheblich eingeschränkt; für volle Erwerbsminderung regelmäßig unter drei Stunden täglich.',
    'Die allgemeine Wartezeit von regelmäßig fünf Jahren ist erfüllt oder eine Ausnahme greift.',
    'Regelmäßig liegen mindestens drei Jahre Pflichtbeiträge innerhalb der letzten fünf Jahre vor oder eine Sonderregel greift.',
    'Die Rentenversicherung prüft medizinisch und nach dem Grundsatz „Reha vor Rente“, ob Rehabilitation vorrangig ist.'
  ],
  grundsicherungAlter:[
    'Die Regelaltersgrenze ist erreicht oder es liegt eine dauerhafte volle Erwerbsminderung im gesetzlichen Sinn vor.',
    'Der notwendige Lebensunterhalt kann nicht ausreichend aus eigenem Einkommen und Vermögen bestritten werden.',
    'Gewöhnlicher Aufenthalt und sonstige sozialhilferechtliche Voraussetzungen müssen erfüllt sein.',
    'Bedarf, Unterkunftskosten, Einkommen und Vermögen werden im Einzelfall berechnet.'
  ],
  witwen:[
    'Die Ehe oder eingetragene Lebenspartnerschaft bestand beim Tod der verstorbenen Person.',
    'Die verstorbene Person hat die allgemeine Wartezeit erfüllt, diese gilt als vorzeitig erfüllt oder sie bezog bereits eine Rente.',
    'Bei neueren Ehen bestand die Ehe grundsätzlich mindestens ein Jahr; bei kürzerer Dauer können Ausnahmen greifen.',
    'Die hinterbliebene Person hat nicht erneut geheiratet bzw. keine neue eingetragene Lebenspartnerschaft begründet.'
  ],
  waisen:[
    'Mindestens ein Elternteil ist verstorben.',
    'Der verstorbene Elternteil hat die rentenrechtlichen Voraussetzungen erfüllt bzw. bereits eine Rente bezogen oder eine Sonderregel greift.',
    'Bis 18 besteht der Anspruch grundsätzlich altersbedingt; darüber hinaus regelmäßig nur bis höchstens 27 bei anerkanntem Ausbildungs-, Studien-, Freiwilligendienst- oder vergleichbarem Status.',
    'Bei Vollwaisen- und Halbwaisenrente unterscheiden sich Höhe und weitere Details.'
  ],
  but_ausfluege:[
    'Es besteht Zugang zum Bildungspaket, z. B. durch Kinderzuschlag, Wohngeld, Grundsicherungsgeld oder bestimmte Sozialhilfeleistungen.',
    'Das Kind besucht Schule, Kita oder Kindertagespflege.',
    'Es fallen Kosten für einen ein- oder mehrtägigen Ausflug bzw. eine Klassen-/Kitafahrt an.'
  ],
  but_schulbedarf:[
    'Es besteht Zugang zum Bildungspaket.',
    'Das Kind bzw. die junge Person besucht eine allgemein- oder berufsbildende Schule und erhält hierfür grundsätzlich keine Ausbildungsvergütung.',
    'Alters- und Leistungsbezugsvoraussetzungen des Bildungspakets sind erfüllt.'
  ],
  but_mittagessen:[
    'Es besteht Zugang zum Bildungspaket.',
    'Das Kind nimmt an gemeinschaftlicher Mittagsverpflegung in Schule, Kita, Kindertagespflege oder einem entsprechend kooperierenden Hort teil.'
  ],
  but_schuelerbefoerderung:[
    'Es besteht Zugang zum Bildungspaket und die Person besucht eine Schule.',
    'Schülerbeförderung ist für den Schulbesuch erforderlich und die Kosten werden nicht bereits vollständig von anderer Stelle getragen.',
    'Örtliche Besonderheiten und Zumutbarkeitsgrenzen werden geprüft.'
  ],
  but_lernfoerderung:[
    'Es besteht Zugang zum Bildungspaket und die Person besucht eine Schule.',
    'Zusätzliche Lernförderung ist nach schulischer Einschätzung erforderlich, um wesentliche Lernziele zu erreichen.',
    'Die Förderung geht über die regulären schulischen Angebote hinaus.'
  ],
  but_teilhabe:[
    'Es besteht Zugang zum Bildungspaket.',
    'Das Kind oder der Jugendliche ist noch nicht 18 Jahre alt.',
    'Es entstehen Kosten für soziale oder kulturelle Teilhabe, z. B. Sportverein, Musikunterricht oder vergleichbare Aktivitäten.'
  ],
  kita_beitrag:[
    'Kinderzuschlag wird bezogen und das Kind besucht eine beitragspflichtige Kindertagesbetreuung.',
    'Die konkrete Befreiung bzw. Ermäßigung wird nach den für die Betreuung geltenden örtlichen Regeln umgesetzt.'
  ],
  mutter_kind_stiftung:[
    'Es besteht eine Schwangerschaft und eine finanzielle Notlage.',
    'Andere Hilfen stehen nicht, nicht ausreichend oder nicht rechtzeitig zur Verfügung.',
    'Der Antrag muss während der Schwangerschaft über eine Schwangerschaftsberatungsstelle gestellt werden.',
    'Es besteht kein pauschaler Rechtsanspruch; Art und Höhe der Hilfe richten sich nach dem Einzelfall.'
  ],
  erstausstattung_wohnung:[
    'Es besteht ein notwendiger erstmaliger Bedarf an Möbeln bzw. Haushaltsgegenständen, z. B. beim erstmaligen Bezug einer eigenen Wohnung.',
    'Die Kosten können nicht aus eigenen Mitteln gedeckt werden.',
    'Die zuständige Stelle prüft Notwendigkeit und Leistungsweg; eine Einmalleistung kann auch ohne laufenden Grundsicherungsbezug zu prüfen sein.'
  ],
  erstausstattung_baby:[
    'Es besteht Schwangerschaft bzw. Geburt und ein notwendiger Bedarf an Erstausstattung.',
    'Die Kosten können nicht ausreichend aus eigenen Mitteln gedeckt werden.',
    'Eine Einmalleistung muss gesondert beantragt werden; daneben kann die Bundesstiftung Mutter und Kind relevant sein.'
  ],
  mehrbedarf_schwangerschaft:[
    'Es besteht eine Schwangerschaft und wirtschaftliche Hilfebedürftigkeit.',
    'Der Mehrbedarf wird im Rahmen der einschlägigen existenzsichernden Leistung geprüft.',
    'Der genaue Beginn und die Höhe richten sich nach dem jeweiligen Leistungssystem.'
  ],
  mehrbedarf_alleinerziehend:[
    'Die Person lebt mit mindestens einem minderjährigen Kind zusammen und trägt die Pflege und Erziehung im Wesentlichen allein.',
    'Es besteht Hilfebedürftigkeit im einschlägigen existenzsichernden Leistungssystem.',
    'Höhe und Umfang hängen u. a. von Zahl und Alter der Kinder ab.'
  ],
  rundfunk:[
    'Es wird eine ausdrücklich befreiungsberechtigende Sozial- oder Ausbildungsleistung bezogen oder ein anerkannter Härtefall liegt vor.',
    'Wohngeld oder Arbeitslosengeld I allein führen grundsätzlich nicht zur Standardbefreiung.',
    'Die Befreiung oder Ermäßigung erfolgt nicht automatisch, sondern auf Antrag.'
  ],
  wbs:[
    'Es wird eine geförderte Mietwohnung gesucht bzw. soll eine solche bezogen werden.',
    'Das Haushaltseinkommen überschreitet die jeweils geltende Einkommensgrenze nicht.',
    'Einkommensgrenzen und weitere Regeln unterscheiden sich nach Bundesland bzw. Region.'
  ],
  wohngeld_lastenzuschuss:[
    'Selbst genutztes Wohneigentum verursacht berücksichtigungsfähige Belastungen.',
    'Das Haushaltseinkommen liegt innerhalb der Wohngeldgrenzen.',
    'Haushaltsgröße, Belastung und örtliche Rahmenbedingungen werden berücksichtigt.',
    'Paralleler Bezug einer Transferleistung mit berücksichtigten Unterkunftskosten schließt Wohngeld häufig aus.'
  ],
  gkv_zuzahlung:[
    'Es besteht gesetzliche Krankenversicherung und es wurden anrechenbare gesetzliche Zuzahlungen geleistet.',
    'Die persönliche jährliche Belastungsgrenze wird erreicht; grundsätzlich 2 Prozent der maßgeblichen Bruttoeinnahmen, bei bestimmten schwerwiegend chronisch Kranken 1 Prozent.',
    'Die Befreiung bzw. Erstattung muss bei der Krankenkasse beantragt werden.'
  ],
  haushaltshilfe:[
    'Die gesetzliche Krankenversicherung ist zuständig und der Haushalt kann wegen Krankheit, Krankenhausbehandlung, Reha oder vergleichbarer Situation nicht weitergeführt werden.',
    'Eine andere im Haushalt lebende Person kann den Haushalt nicht in erforderlichem Umfang übernehmen.',
    'Je nach Leistungsgrund gelten zusätzliche Voraussetzungen, insbesondere zum Alter oder Hilfebedarf von Kindern.'
  ],
  zahnersatz_haertefall:[
    'Es besteht gesetzliche Krankenversicherung und medizinisch notwendiger Zahnersatz ist geplant.',
    'Das maßgebliche Einkommen liegt unter der Härtefallgrenze oder eine privilegierte Sozial-/Ausbildungsleistung führt zur Härtefallbehandlung.',
    'Bei Einkommen knapp oberhalb der Grenze kann ein gleitender Härtefall geprüft werden.'
  ],
  pflege_entlastung:[
    'Mindestens Pflegegrad 1 liegt vor.',
    'Die Leistung wird zweckgebunden für anerkannte Unterstützungs- und Entlastungsangebote eingesetzt.',
    'Nicht ausgeschöpfte Beträge und Übertragungsmöglichkeiten sind mit der Pflegekasse zu prüfen.'
  ],
  pflege_hilfsmittel:[
    'Pflegebedürftigkeit mit Pflegegrad liegt vor und die Pflege erfolgt zu Hause.',
    'Das Hilfsmittel dient der Erleichterung der Pflege, der Linderung von Beschwerden oder einer selbstständigeren Lebensführung.',
    'Für zum Verbrauch bestimmte Pflegehilfsmittel gelten eigene Erstattungsregeln.'
  ],
  pflege_wohnumfeld:[
    'Mindestens Pflegegrad 1 liegt vor.',
    'Eine Anpassung des Wohnumfelds verbessert die häusliche Pflege, ermöglicht sie oder erhöht die Selbstständigkeit.',
    'Die Maßnahme sollte vor Beauftragung mit der Pflegekasse abgestimmt werden.'
  ],
  pflege_ersatzpflege:[
    'Mindestens Pflegegrad 2 liegt vor.',
    'Die Pflege findet häuslich statt und die reguläre Pflegeperson fällt zeitweise aus bzw. eine vorübergehende stationäre Versorgung ist notwendig.',
    'Für Verhinderungs- und Kurzzeitpflege besteht ein gemeinsames Budget; Detailvoraussetzungen unterscheiden sich.'
  ],
  pflegeunterstuetzungsgeld:[
    'Ein naher Angehöriger ist akut pflegebedürftig oder eine akute Pflegesituation muss organisiert werden.',
    'Die beschäftigte Person nimmt hierfür eine kurzzeitige Arbeitsverhinderung in Anspruch.',
    'Es wird kein Arbeitsentgelt für die Ausfallzeit gezahlt und die weiteren versicherungsrechtlichen Voraussetzungen sind erfüllt.'
  ],
  pflege_pauschbetrag:[
    'Eine pflegebedürftige Person wird persönlich und grundsätzlich unentgeltlich gepflegt.',
    'Der Pflegegrad bzw. das Merkzeichen erfüllt die steuerlichen Voraussetzungen.',
    'Die Pflege findet in der eigenen Wohnung oder der Wohnung der gepflegten Person im gesetzlich begünstigten Rahmen statt.'
  ],
  vermittlungsbudget:[
    'Die Förderung unterstützt die berufliche Eingliederung bzw. Ausbildungsplatzsuche und wird von Agentur für Arbeit oder Jobcenter als notwendig anerkannt.',
    'Förderfähig können z. B. Bewerbungs-, Reise-, Dokumenten-, Arbeitsmittel- oder Umzugskosten sein.',
    'Viele Kosten müssen vor ihrer Entstehung beantragt bzw. abgestimmt werden; die Förderung ist regelmäßig eine Ermessensleistung.'
  ],
  mobilitaetszuschuss:[
    'Eine förderfähige Berufsausbildung wird in einer anderen Region aufgenommen.',
    'Der Ausbildungsort liegt außerhalb des üblichen Tagespendelbereichs und deshalb ist ein Umzug erforderlich.',
    'Die Förderung muss vor Ausbildungsbeginn mit Agentur für Arbeit bzw. Jobcenter abgestimmt werden.',
    'Es besteht kein allgemeiner Rechtsanspruch.'
  ],
  weiterbildungsgeld:[
    'Eine von Agentur für Arbeit oder Jobcenter geförderte abschlussorientierte Weiterbildung wird tatsächlich absolviert.',
    'Die Maßnahme erfüllt die Fördervoraussetzungen der beruflichen Weiterbildung.',
    'Zusätzlich können je nach Fall Fahrt-, Kinderbetreuungs-, Unterbringungs- oder weitere Weiterbildungskosten übernommen werden.'
  ],
  insolvenzgeld:[
    'Ein Insolvenzereignis beim Arbeitgeber liegt vor und Arbeitsentgelt ist ausgefallen.',
    'Die Beschäftigung fällt in den geschützten Zeitraum; Insolvenzgeld deckt grundsätzlich die letzten drei Monate vor dem Insolvenzereignis ab.',
    'Der Antrag muss grundsätzlich innerhalb von zwei Monaten nach dem Insolvenzereignis gestellt werden.'
  ],
  kinderbetreuung_steuer:[
    'Ein zum Haushalt gehörendes Kind ist grundsätzlich noch keine 14 Jahre alt oder erfüllt die besondere Behinderungsausnahme.',
    'Es wurden tatsächlich Kinderbetreuungskosten gezahlt; Unterricht, besondere Fähigkeiten und Freizeitangebote zählen nicht dazu.',
    'Rechnung und unbare Zahlung müssen nachgewiesen werden können.'
  ],
  entlastungsbetrag_alleinerziehend:[
    'Mindestens ein Kind lebt im Haushalt und für dieses besteht Kindergeld-/Kinderfreibetragsberechtigung.',
    'Die Person ist alleinstehend und es lebt grundsätzlich keine andere volljährige Person in Haushaltsgemeinschaft, soweit keine gesetzliche Ausnahme greift.',
    'Die steuerliche Entlastung kann über Steuerklasse II bzw. die Einkommensteuerveranlagung berücksichtigt werden.'
  ],
  behinderten_pauschbetrag:[
    'Ein Grad der Behinderung von mindestens 20 wurde amtlich festgestellt.',
    'Der Pauschbetrag wird steuerlich geltend gemacht; seine Höhe richtet sich nach dem festgestellten Grad der Behinderung.',
    'Für bestimmte Merkzeichen bzw. Hilflosigkeit gelten besondere Pauschbeträge und Regeln.'
  ],
  schwerbehinderten_mobilitaet:[
    'Ein Schwerbehindertenausweis mit relevantem Merkzeichen liegt vor.',
    'Je nach Merkzeichen kommen Kfz-Steuerbefreiung/-ermäßigung oder andere Mobilitätsvergünstigungen in Betracht.',
    'Bei bestimmten Kfz-Steuerermäßigungen bestehen Wechselwirkungen mit der unentgeltlichen Beförderung im öffentlichen Verkehr.'
  ]
};

const CLAIM_FOLLOWUP_IDS=new Set([
  'but_ausfluege','but_schulbedarf','but_mittagessen','but_schuelerbefoerderung','but_lernfoerderung','but_teilhabe','kita_beitrag',
  'mutter_kind_stiftung','erstausstattung_wohnung','erstausstattung_baby','mehrbedarf_schwangerschaft','mehrbedarf_alleinerziehend','rundfunk','wbs','wohngeld_lastenzuschuss',
  'gkv_zuzahlung','haushaltshilfe','zahnersatz_haertefall','pflege_entlastung','pflege_hilfsmittel','pflege_wohnumfeld','pflege_ersatzpflege','pflegeunterstuetzungsgeld','pflege_pauschbetrag',
  'vermittlungsbudget','mobilitaetszuschuss','weiterbildungsgeld','insolvenzgeld','kinderbetreuung_steuer','entlastungsbetrag_alleinerziehend','behinderten_pauschbetrag','schwerbehinderten_mobilitaet'
]);

const CLAIM_FIELDS=[
  'householdSize','housingType','housingCost',
  'incomeSituation','householdNetIncome','assetsBand','receivesKiz','receivesWohngeld','receivesGrundsicherung','receivesSocialAssistance','currentBenefit',
  'employmentStatus','weeklyHours','unemployedRegistered','insuranceMonths30',
  'childrenInHousehold','childUnder18','childUnder14','child18to24Eligible','receivesChildBenefit','singleParent','otherAdultInHousehold','maintenanceStatus','pregnant','youngestChildBirthDate','childCareSelf','taxableIncomeOver175k','hasSchoolChild','hasKitaChild','schoolTripPlanned','communityMeal','schoolTransportNeeded','learningSupportNeeded','socialParticipationCosts','paidChildcareCosts','needsBabyEquipment',
  'educationStatus','educationFullTime','trainingType','livingWithParents','firstVocationalTraining','educationIncomeTight','receivesBafoeg','receivesBab','trainingFarAwayRequiresMove','fundedQualificationTraining',
  'healthInsuranceType','longSick6Weeks','childCareIllNow','childStatutoryHealth','childUnder12OrDisabled','gkvCopaysHigh','severeChronic','householdHelpNeeded','dentalTreatmentPlanned',
  'careGrade','homeCare','workCapacity','permanentFullReduction','caresForRelativeAcute','caresForRelativeUnpaid','careRecipientGrade',
  'pension5Years','pension3of5','spouseDeceased','marriedAtDeath','marriageOneYear','deceasedPensionEligible','remarriedAfterDeath','parentDeceased','deceasedParentPensionEligible','orphanEligibleActivity',
  'needsInitialFurnishing','jobSearchCosts','employerInsolventUnpaidWages','disabilityDegree','disabilityMarker','ownsVehicle'
];

function claimVal(p,key){const raw=String(p?.claimProfile?.[key]??'').trim();if(raw)return raw;if(key==='employmentStatus'){if(p?.life?.employed==='yes')return 'employed';if(p?.life?.pensioner==='yes')return 'pensioner'}if(key==='pension5Years'&&['yes','no'].includes(p?.life?.pensionEligibility))return p.life.pensionEligibility;return ''}
function claimYes(p,key){return claimVal(p,key)==='yes'}
function claimNo(p,key){return claimVal(p,key)==='no'}
function claimUnknown(p,key){return !claimVal(p,key)||claimVal(p,key)==='unknown'}
function claimNum(p,key){const raw=claimVal(p,key);if(!raw)return null;const n=Number(String(raw).replace(',','.'));return Number.isFinite(n)?n:null}
function claimAge(p){const b=p?.profile?.birthDate;if(!b)return null;const d=new Date(b+'T00:00:00'),now=new Date();if(isNaN(d))return null;let a=now.getFullYear()-d.getFullYear();const m=now.getMonth()-d.getMonth();if(m<0||(m===0&&now.getDate()<d.getDate()))a--;return a}
function monthsSince(date){if(!date)return null;const d=new Date(date+'T00:00:00'),n=new Date();if(isNaN(d)||d>n)return null;let m=(n.getFullYear()-d.getFullYear())*12+n.getMonth()-d.getMonth();if(n.getDate()<d.getDate())m--;return m}
function claimLivesGermany(p){const c=(p?.profile?.country||'').trim().toLowerCase();if(!c)return null;return ['deutschland','germany','de'].includes(c)}
function claimResult(id,title,icon,category,status,reason,missing=[],sourceKey=id){return {id,title,icon,category,status,reason,missing,source:CLAIM_SOURCES[sourceKey]||'',verified:CLAIMS_VERIFIED}}
function need(p, pairs){return pairs.filter(([k])=>claimUnknown(p,k)||claimVal(p,k)==='').map(([,label])=>label)}
function ageUnder(p,n){const a=claimAge(p);return a===null?null:a<n}
function childSignal(p){if(claimYes(p,'childUnder18')||claimYes(p,'child18to24Eligible'))return true;if(claimNo(p,'childUnder18')&&claimNo(p,'child18to24Eligible'))return false;return null}
function incomeTight(p){return ['tight','notEnough'].includes(claimVal(p,'incomeSituation'))}
function incomeInsufficient(p){return claimVal(p,'incomeSituation')==='notEnough'}

function evaluateClaims(p){
  if(!p)return [];
  const out=[],age=claimAge(p),child=childSignal(p),resDE=claimLivesGermany(p),cp=p.claimProfile||{};
  const current=claimVal(p,'currentBenefit');
  const currentKiz=claimYes(p,'receivesKiz')||current==='kiz', currentWohngeld=claimYes(p,'receivesWohngeld')||current==='wohngeld', currentGS=claimYes(p,'receivesGrundsicherung')||current==='grundsicherung', currentSocial=claimYes(p,'receivesSocialAssistance')||current==='social';
  const butBase=currentKiz||currentWohngeld||currentGS||currentSocial, schoolChild=claimYes(p,'hasSchoolChild'), kitaChild=claimYes(p,'hasKitaChild');

  // Kindergeld
  if(child===true) out.push(claimResult('kindergeld','Kindergeld','👶','Familie','likely','Mindestens ein Kind ist als alters-/ausbildungsbedingt grundsätzlich relevant hinterlegt.',[],'kindergeld'));
  else if(child===false) out.push(claimResult('kindergeld','Kindergeld','👶','Familie','none','Derzeit ist kein Kind unter 18 bzw. kein relevanter Status zwischen 18 und 24 hinterlegt.',[],'kindergeld'));
  else out.push(claimResult('kindergeld','Kindergeld','👶','Familie','check','Das Alter bzw. der Ausbildungsstatus der Kinder ist noch nicht vollständig geklärt.',need(p,[['childUnder18','Kind unter 18?'],['child18to24Eligible','Kind 18–24 in Ausbildung/Studium/Freiwilligendienst o. ä.?']]),'kindergeld'));

  // Kinderzuschlag
  if(claimNo(p,'receivesChildBenefit')) out.push(claimResult('kiz','Kinderzuschlag','🧒','Familie','none','Kinderzuschlag setzt grundsätzlich einen Kindergeldanspruch voraus.',[],'kiz'));
  else if(child===true && claimYes(p,'receivesChildBenefit') && incomeTight(p) && !currentGS) out.push(claimResult('kiz','Kinderzuschlag','🧒','Familie','check','Kindergeld, Kind im Haushalt und knappes Familieneinkommen sprechen für eine genaue KiZ-Prüfung. Die Höhe ist komplex und wird hier nicht berechnet.',[],'kiz'));
  else out.push(claimResult('kiz','Kinderzuschlag','🧒','Familie','check','Für eine belastbare Vorauswahl fehlen noch Angaben zu Kindergeld, Kindern oder Einkommenssituation.',need(p,[['receivesChildBenefit','Kindergeldanspruch/-bezug'],['childUnder18','Kind unter 18?'],['incomeSituation','Reicht das Haushaltseinkommen?']]),'kiz'));

  // Bildung und Teilhabe
  if(butBase && child===true) out.push(claimResult('but','Bildung & Teilhabe','🎒','Familie','likely','Im Haushalt ist Kinderzuschlag, Wohngeld oder Grundsicherungsgeld hinterlegt; damit sollten Leistungen für Bildung und Teilhabe für Kinder mitgeprüft werden.',[],'but'));
  else out.push(claimResult('but','Bildung & Teilhabe','🎒','Familie','check','Die Leistung hängt insbesondere von einer passenden Grundleistung und einem Kind/Jugendlichen im Haushalt ab.',need(p,[['receivesKiz','Kinderzuschlag bezogen?'],['receivesWohngeld','Wohngeld bezogen?'],['receivesGrundsicherung','Grundsicherungsgeld bezogen?'],['childUnder18','Kind/Jugendlicher im Haushalt']]),'but'));


  // Folgeansprüche Bildung & Teilhabe – bewusst einzeln, damit nichts übersehen wird
  if(child===false){
    out.push(claimResult('but_ausfluege','Ausflüge & Klassen-/Kitafahrten','🚌','Bildung & Teilhabe','none','Kein relevantes Kind/Jugendlicher im Haushalt hinterlegt.',[],'but_ausfluege'));
    out.push(claimResult('but_schulbedarf','Persönlicher Schulbedarf','🎒','Bildung & Teilhabe','none','Kein relevantes Schulkind hinterlegt.',[],'but_schulbedarf'));
    out.push(claimResult('but_mittagessen','Mittagessen in Schule/Kita','🍽️','Bildung & Teilhabe','none','Kein relevantes Kind/Jugendlicher im Haushalt hinterlegt.',[],'but_mittagessen'));
    out.push(claimResult('but_schuelerbefoerderung','Schülerbeförderung','🚌','Bildung & Teilhabe','none','Kein relevantes Schulkind hinterlegt.',[],'but_schuelerbefoerderung'));
    out.push(claimResult('but_lernfoerderung','Lernförderung / Nachhilfe','📚','Bildung & Teilhabe','none','Kein relevantes Schulkind hinterlegt.',[],'but_lernfoerderung'));
    out.push(claimResult('but_teilhabe','Sport, Musik & soziale Teilhabe','⚽','Bildung & Teilhabe','none','Kein Kind/Jugendlicher unter 18 hinterlegt.',[],'but_teilhabe'));
  }else{
    out.push(claimResult('but_ausfluege','Ausflüge & Klassen-/Kitafahrten','🚌','Bildung & Teilhabe',butBase&&claimYes(p,'schoolTripPlanned')?'likely':'check',butBase?'Der Zugang zum Bildungspaket ist grundsätzlich eröffnet. Bei einem anstehenden Schul-/Kitaausflug oder einer Klassenfahrt sollten die tatsächlichen Kosten geprüft werden.':'Für die Kostenübernahme ist insbesondere der Zugang zum Bildungspaket entscheidend.',butBase?need(p,[['schoolTripPlanned','Steht eine Klassen-/Kitafahrt oder ein Ausflug an?']]):['Kinderzuschlag, Wohngeld, Grundsicherung oder andere BuT-Grundleistung'],'but_ausfluege'));
    out.push(claimResult('but_schulbedarf','Persönlicher Schulbedarf','🎒','Bildung & Teilhabe',butBase&&schoolChild?'likely':'check',butBase&&schoolChild?'Bildungspaket und Schulkind sind hinterlegt; der persönliche Schulbedarf sollte automatisch bzw. auf dem vorgesehenen Leistungsweg berücksichtigt werden.':'Für den Schulbedarf braucht es Zugang zum Bildungspaket und ein Schulkind.',need(p,[['hasSchoolChild','Schulkind im Haushalt?']]),'but_schulbedarf'));
    out.push(claimResult('but_mittagessen','Mittagessen in Schule/Kita','🍽️','Bildung & Teilhabe',butBase&&(schoolChild||kitaChild)&&claimYes(p,'communityMeal')?'likely':'check',butBase?'Bei gemeinschaftlicher Mittagsverpflegung kann das Bildungspaket die Kosten übernehmen.':'Zunächst muss geklärt sein, ob das Bildungspaket greift.',need(p,[['hasSchoolChild','Schulkind im Haushalt?'],['hasKitaChild','Kita-/Tagespflegekind im Haushalt?'],['communityMeal','Gemeinschaftliches Mittagessen genutzt?']]),'but_mittagessen'));
    out.push(claimResult('but_schuelerbefoerderung','Schülerbeförderung','🚌','Bildung & Teilhabe',butBase&&schoolChild&&claimYes(p,'schoolTransportNeeded')?'likely':'check',butBase&&schoolChild?'Bei notwendiger Schülerbeförderung sollten die verbleibenden Kosten geprüft werden.':'Schulbesuch, notwendige Beförderung und Zugang zum Bildungspaket müssen zusammenpassen.',need(p,[['hasSchoolChild','Schulkind im Haushalt?'],['schoolTransportNeeded','Kostenpflichtige Schülerbeförderung notwendig?']]),'but_schuelerbefoerderung'));
    out.push(claimResult('but_lernfoerderung','Lernförderung / Nachhilfe','📚','Bildung & Teilhabe',butBase&&schoolChild&&claimYes(p,'learningSupportNeeded')?'likely':'check',butBase&&schoolChild?'Wenn zusätzliche Lernförderung erforderlich ist, sollte die Kostenübernahme geprüft werden.':'Zugang zum Bildungspaket, Schulbesuch und konkreter Förderbedarf müssen geklärt werden.',need(p,[['hasSchoolChild','Schulkind im Haushalt?'],['learningSupportNeeded','Zusätzliche Lernförderung erforderlich?']]),'but_lernfoerderung'));
    out.push(claimResult('but_teilhabe','Sport, Musik & soziale Teilhabe','⚽','Bildung & Teilhabe',butBase&&claimYes(p,'childUnder18')&&claimYes(p,'socialParticipationCosts')?'likely':'check',butBase?'Bei Kosten für Verein, Musik oder vergleichbare Teilhabe kann eine Leistung aus dem Bildungspaket in Betracht kommen.':'Zunächst muss der Zugang zum Bildungspaket geklärt sein.',need(p,[['childUnder18','Kind/Jugendlicher unter 18?'],['socialParticipationCosts','Kosten für Sport/Musik/Freizeit?']]),'but_teilhabe'));
  }

  // Folgeanspruch KiZ: Kita-Beiträge
  if(currentKiz&&kitaChild) out.push(claimResult('kita_beitrag','Kita-Beitragsbefreiung / Ermäßigung','🧸','Familie','check','Kinderzuschlag und ein Kita-/Tagespflegekind sind hinterlegt. Eine Befreiung bzw. Ermäßigung der Elternbeiträge sollte bei der zuständigen Stelle geprüft werden.',[],'kita_beitrag'));
  else if(claimNo(p,'hasKitaChild')) out.push(claimResult('kita_beitrag','Kita-Beitragsbefreiung / Ermäßigung','🧸','Familie','none','Kein Kita-/Tagespflegekind hinterlegt.',[],'kita_beitrag'));
  else out.push(claimResult('kita_beitrag','Kita-Beitragsbefreiung / Ermäßigung','🧸','Familie','check','Besonders bei Kinderzuschlag sollte die örtliche Kita-Beitragsbefreiung geprüft werden.',need(p,[['hasKitaChild','Kita-/Tagespflegekind im Haushalt?'],['receivesKiz','Kinderzuschlag bezogen?']]),'kita_beitrag'));

  // Elterngeld
  const babyMonths=monthsSince(claimVal(p,'youngestChildBirthDate'));
  const hours=claimNum(p,'weeklyHours');
  if(babyMonths!==null && babyMonths>14) out.push(claimResult('elterngeld','Elterngeld','🍼','Familie','none','Das jüngste hinterlegte Kind ist älter als der typische Bezugszeitraum für Elterngeld.',[],'elterngeld'));
  else if(babyMonths!==null && babyMonths<=14 && claimYes(p,'childCareSelf') && (hours===null||hours<=32) && claimNo(p,'taxableIncomeOver175k') && resDE!==false) out.push(claimResult('elterngeld','Elterngeld','🍼','Familie','likely','Junges Kind, Betreuung im eigenen Haushalt, Arbeitszeit bis 32 Stunden und kein Einkommen oberhalb der Ausschlussgrenze sind hinterlegt.',[],'elterngeld'));
  else out.push(claimResult('elterngeld','Elterngeld','🍼','Familie','check','Für die Vorauswahl sind Geburtsdatum des jüngsten Kindes, Betreuung, Arbeitszeit und Einkommensgrenze wichtig.',need(p,[['youngestChildBirthDate','Geburtsdatum jüngstes Kind'],['childCareSelf','Kind selbst betreut?'],['taxableIncomeOver175k','Zu versteuerndes Jahreseinkommen über 175.000 €?']]),'elterngeld'));

  // Mutterschaftsgeld
  if(claimNo(p,'pregnant')) out.push(claimResult('mutterschaft','Mutterschaftsgeld','🤰','Familie','none','Keine Schwangerschaft hinterlegt.',[],'mutterschaft'));
  else if(claimYes(p,'pregnant') && claimVal(p,'employmentStatus')==='employed' && claimVal(p,'healthInsuranceType')==='statutory') out.push(claimResult('mutterschaft','Mutterschaftsgeld','🤰','Familie','likely','Schwangerschaft, Beschäftigung und gesetzliche Krankenversicherung sind hinterlegt.',[],'mutterschaft'));
  else if(claimYes(p,'pregnant')) out.push(claimResult('mutterschaft','Mutterschaftsgeld','🤰','Familie','check','Bei Schwangerschaft können je nach Beschäftigung und Versicherungsstatus Mutterschaftsleistungen der Krankenkasse oder des Bundesamts für Soziale Sicherung in Betracht kommen.',need(p,[['employmentStatus','Beschäftigungsstatus'],['healthInsuranceType','Krankenversicherungsart']]),'mutterschaft'));
  else out.push(claimResult('mutterschaft','Mutterschaftsgeld','🤰','Familie','check','Schwangerschaftsstatus ist nicht angegeben.',['Schwangerschaft ja/nein'],'mutterschaft'));

  // Unterhaltsvorschuss
  if(claimYes(p,'singleParent') && claimYes(p,'childUnder18') && ['none','partial'].includes(claimVal(p,'maintenanceStatus'))) out.push(claimResult('unterhaltsvorschuss','Unterhaltsvorschuss','👤','Familie','check','Alleinerziehend, minderjähriges Kind und fehlender bzw. unregelmäßiger Unterhalt sprechen für eine Prüfung. Bei 12–17-Jährigen gelten zusätzliche Voraussetzungen.',[],'unterhaltsvorschuss'));
  else if(claimVal(p,'maintenanceStatus')==='regular') out.push(claimResult('unterhaltsvorschuss','Unterhaltsvorschuss','👤','Familie','none','Regelmäßiger ausreichender Unterhalt ist hinterlegt; damit fehlt der typische Auslöser für Unterhaltsvorschuss.',[],'unterhaltsvorschuss'));
  else out.push(claimResult('unterhaltsvorschuss','Unterhaltsvorschuss','👤','Familie','check','Für die Prüfung sind Alleinerziehendenstatus, Alter des Kindes und tatsächliche Unterhaltszahlungen entscheidend.',need(p,[['singleParent','Alleinerziehend?'],['childUnder18','Kind unter 18?'],['maintenanceStatus','Unterhalt regelmäßig/teilweise/gar nicht?']]),'unterhaltsvorschuss'));


  // Schwangerschaft: Bundesstiftung und zusätzliche Bedarfe
  if(claimYes(p,'pregnant')&&incomeTight(p)) out.push(claimResult('mutter_kind_stiftung','Bundesstiftung Mutter und Kind','🤱','Schwangerschaft','check','Schwangerschaft und finanzielle Enge sind hinterlegt. Die Stiftung kann ergänzend helfen; der Antrag muss während der Schwangerschaft über eine Beratungsstelle gestellt werden.',[],'mutter_kind_stiftung'));
  else if(claimNo(p,'pregnant')) out.push(claimResult('mutter_kind_stiftung','Bundesstiftung Mutter und Kind','🤱','Schwangerschaft','none','Keine Schwangerschaft hinterlegt.',[],'mutter_kind_stiftung'));
  else out.push(claimResult('mutter_kind_stiftung','Bundesstiftung Mutter und Kind','🤱','Schwangerschaft','check','Relevant bei Schwangerschaft in finanzieller Notlage, wenn andere Hilfen nicht ausreichend oder nicht rechtzeitig verfügbar sind.',need(p,[['pregnant','Schwangerschaft?'],['incomeSituation','Finanzielle Situation']]),'mutter_kind_stiftung'));

  if(claimYes(p,'needsBabyEquipment')&&(currentGS||currentSocial||incomeInsufficient(p))) out.push(claimResult('erstausstattung_baby','Erstausstattung bei Schwangerschaft/Geburt','🍼','Einmalige Hilfen','likely','Bedarf an Baby-Erstausstattung und wirtschaftliche Hilfebedürftigkeit sind hinterlegt. Eine einmalige Leistung sollte vor Anschaffung geprüft werden.',[],'erstausstattung_baby'));
  else out.push(claimResult('erstausstattung_baby','Erstausstattung bei Schwangerschaft/Geburt','🍼','Einmalige Hilfen','check','Bei Schwangerschaft/Geburt können notwendige Erstausstattungen gesondert gefördert werden.',need(p,[['needsBabyEquipment','Baby-Erstausstattung benötigt?'],['incomeSituation','Finanzielle Situation']]),'erstausstattung_baby'));

  if(claimYes(p,'needsInitialFurnishing')&&(currentGS||currentSocial||incomeInsufficient(p))) out.push(claimResult('erstausstattung_wohnung','Erstausstattung der Wohnung','🛋️','Einmalige Hilfen','likely','Notwendige erstmalige Wohnungsausstattung und wirtschaftliche Hilfebedürftigkeit sind hinterlegt. Eine Einmalleistung sollte vor Anschaffung geprüft werden.',[],'erstausstattung_wohnung'));
  else out.push(claimResult('erstausstattung_wohnung','Erstausstattung der Wohnung','🛋️','Einmalige Hilfen','check','Bei erstmaligem notwendigem Einrichtungsbedarf kann eine einmalige Unterstützung möglich sein.',need(p,[['needsInitialFurnishing','Erstmalige notwendige Wohnungsausstattung fehlt?'],['incomeSituation','Finanzielle Situation']]),'erstausstattung_wohnung'));

  if(claimYes(p,'pregnant')&&(currentGS||currentSocial)) out.push(claimResult('mehrbedarf_schwangerschaft','Mehrbedarf Schwangerschaft','🤰','Existenzsicherung','likely','Schwangerschaft und eine existenzsichernde Grundleistung sind hinterlegt. Ein Schwangerschafts-Mehrbedarf sollte im Bescheid berücksichtigt werden.',[],'mehrbedarf_schwangerschaft'));
  else out.push(claimResult('mehrbedarf_schwangerschaft','Mehrbedarf Schwangerschaft','🤰','Existenzsicherung','check','Bei Schwangerschaft und Hilfebedürftigkeit kann zusätzlich zur Grundleistung ein Mehrbedarf bestehen.',need(p,[['pregnant','Schwangerschaft?'],['receivesGrundsicherung','Grundsicherung bezogen?'],['receivesSocialAssistance','Sozialhilfe bezogen?']]),'mehrbedarf_schwangerschaft'));

  if(claimYes(p,'singleParent')&&(currentGS||currentSocial)&&claimYes(p,'childUnder18')) out.push(claimResult('mehrbedarf_alleinerziehend','Mehrbedarf Alleinerziehende','👤','Existenzsicherung','likely','Alleinerziehend, minderjähriges Kind und existenzsichernde Grundleistung sind hinterlegt. Der Mehrbedarf sollte geprüft bzw. im Bescheid berücksichtigt werden.',[],'mehrbedarf_alleinerziehend'));
  else out.push(claimResult('mehrbedarf_alleinerziehend','Mehrbedarf Alleinerziehende','👤','Existenzsicherung','check','Alleinerziehende können bei Hilfebedürftigkeit einen zusätzlichen Mehrbedarf erhalten.',need(p,[['singleParent','Alleinerziehend?'],['childUnder18','Minderjähriges Kind?']]),'mehrbedarf_alleinerziehend'));

  // Wohngeld
  if(currentGS) out.push(claimResult('wohngeld','Wohngeld','🏠','Wohnen','none','Grundsicherungsgeld ist als aktuelle Leistung hinterlegt; Wohngeld ist dann regelmäßig nicht die parallele Standardleistung.',[],'wohngeld'));
  else if(['rent','own'].includes(claimVal(p,'housingType')) && incomeTight(p)) out.push(claimResult('wohngeld','Wohngeld','🏠','Wohnen','check','Wohnkosten und knappes Einkommen sprechen für eine Wohngeldprüfung. Die tatsächliche Höhe hängt u. a. von Haushaltsgröße, Einkommen, Miete/Belastung und Mietenstufe ab.',need(p,[['householdSize','Haushaltsgröße'],['housingCost','Bruttokaltmiete/Belastung']]),'wohngeld'));
  else out.push(claimResult('wohngeld','Wohngeld','🏠','Wohnen','check','Für die Vorauswahl braucht die App Wohnform, Haushaltsgröße, Wohnkosten und Einkommenssituation.',need(p,[['housingType','Miete oder Eigentum?'],['householdSize','Haushaltsgröße'],['housingCost','Bruttokaltmiete/Belastung'],['incomeSituation','Einkommenssituation']]),'wohngeld'));


  // Übersehene Wohn- und Gebührenansprüche
  if(claimVal(p,'housingType')==='own'&&incomeTight(p)&&!currentGS&&!currentSocial) out.push(claimResult('wohngeld_lastenzuschuss','Wohngeld als Lastenzuschuss für Eigentümer','🏡','Wohnen','check','Selbst genutztes Eigentum und knappes Einkommen sind hinterlegt. Wohngeld kann auch als Lastenzuschuss statt nur als Mietzuschuss möglich sein.',need(p,[['householdSize','Haushaltsgröße'],['housingCost','Monatliche Belastung']]),'wohngeld_lastenzuschuss'));
  else if(claimVal(p,'housingType')==='rent') out.push(claimResult('wohngeld_lastenzuschuss','Wohngeld als Lastenzuschuss für Eigentümer','🏡','Wohnen','none','Mietwohnung hinterlegt; für Mieter ist der Mietzuschuss der passende Wohngeldweg.',[],'wohngeld_lastenzuschuss'));
  else out.push(claimResult('wohngeld_lastenzuschuss','Wohngeld als Lastenzuschuss für Eigentümer','🏡','Wohnen','check','Auch selbstnutzende Eigentümer sollten Wohngeld prüfen, wenn die laufende Belastung bei knappem Einkommen schwer tragbar ist.',need(p,[['housingType','Miete oder Eigentum?'],['incomeSituation','Einkommenssituation']]),'wohngeld_lastenzuschuss'));

  if(incomeTight(p)&&claimVal(p,'housingType')!=='own') out.push(claimResult('wbs','Wohnberechtigungsschein (WBS)','🏘️','Wohnen','check','Geringes bzw. knappes Haushaltseinkommen ist hinterlegt. Für eine geförderte Mietwohnung sollte ein WBS nach den regionalen Einkommensgrenzen geprüft werden.',[],'wbs'));
  else out.push(claimResult('wbs','Wohnberechtigungsschein (WBS)','🏘️','Wohnen','check','Ein WBS kann Zugang zu geförderten Mietwohnungen eröffnen; die Einkommensgrenzen sind regional.',need(p,[['incomeSituation','Einkommenssituation']]),'wbs'));

  const receivesBaf=claimYes(p,'receivesBafoeg'), receivesBab=claimYes(p,'receivesBab');
  if(currentGS||currentSocial||((receivesBaf||receivesBab)&&claimNo(p,'livingWithParents'))) out.push(claimResult('rundfunk','Rundfunkbeitrag: Befreiung / Ermäßigung','📻','Gebühren','likely','Eine typischerweise befreiungsberechtigende Sozial-/Ausbildungsleistung ist hinterlegt. Die Befreiung erfolgt nicht automatisch und sollte beantragt werden.',[],'rundfunk'));
  else if(currentWohngeld) out.push(claimResult('rundfunk','Rundfunkbeitrag: Befreiung / Ermäßigung','📻','Gebühren','check','Wohngeld allein führt grundsätzlich nicht zur Standardbefreiung. Ein besonderer Härtefall oder ein anderer Befreiungsgrund kann trotzdem zu prüfen sein.',[],'rundfunk'));
  else out.push(claimResult('rundfunk','Rundfunkbeitrag: Befreiung / Ermäßigung','📻','Gebühren','check','Die App prüft auf befreiungsberechtigende Sozial-/Ausbildungsleistungen und besondere gesundheitliche Gründe.',need(p,[['receivesGrundsicherung','Grundsicherung bezogen?'],['receivesSocialAssistance','Sozialhilfe bezogen?'],['receivesBafoeg','BAföG bezogen?'],['receivesBab','BAB bezogen?']]),'rundfunk'));

  // Grundsicherungsgeld
  if(currentGS) out.push(claimResult('grundsicherung','Grundsicherungsgeld','🧾','Existenzsicherung','likely','Grundsicherungsgeld ist bereits als aktuelle Leistung hinterlegt.',[],'grundsicherung'));
  else if((age===null||age>=15) && resDE!==false && claimVal(p,'workCapacity')==='3plus' && incomeInsufficient(p)) out.push(claimResult('grundsicherung','Grundsicherungsgeld','🧾','Existenzsicherung','check','Mindestens drei Stunden tägliche Erwerbsfähigkeit und nicht ausreichende eigene Mittel sind hinterlegt. Einkommen, Vermögen und Bedarfsgemeinschaft müssen genau geprüft werden.',[],'grundsicherung'));
  else out.push(claimResult('grundsicherung','Grundsicherungsgeld','🧾','Existenzsicherung','check','Für die Vorauswahl sind Erwerbsfähigkeit, Lebensmittelpunkt und wirtschaftliche Hilfebedürftigkeit maßgeblich.',need(p,[['workCapacity','Arbeitsfähigkeit mindestens 3 Stunden täglich?'],['incomeSituation','Reicht das Einkommen für den Lebensunterhalt?'],['assetsBand','Vermögensklasse']]),'grundsicherung'));

  // Arbeitslosengeld
  if(claimVal(p,'employmentStatus')!=='unemployed' && claimVal(p,'employmentStatus')) out.push(claimResult('alg','Arbeitslosengeld','💼','Arbeit','none','Aktuell ist kein Status „arbeitslos“ hinterlegt.',[],'alg'));
  else if(claimVal(p,'employmentStatus')==='unemployed' && claimYes(p,'unemployedRegistered') && claimVal(p,'insuranceMonths30')==='12plus') out.push(claimResult('alg','Arbeitslosengeld','💼','Arbeit','likely','Arbeitslosigkeit, Arbeitslosmeldung und mindestens 12 Versicherungsmonate innerhalb der letzten 30 Monate sind hinterlegt.',[],'alg'));
  else if(claimVal(p,'employmentStatus')==='unemployed' && claimVal(p,'insuranceMonths30')==='6to11') out.push(claimResult('alg','Arbeitslosengeld','💼','Arbeit','check','6–11 Versicherungsmonate sind hinterlegt. Eine verkürzte Anwartschaft kann in Sonderfällen befristeter Beschäftigung möglich sein.',need(p,[['unemployedRegistered','Arbeitslos gemeldet?']]),'alg'));
  else out.push(claimResult('alg','Arbeitslosengeld','💼','Arbeit','check','Für die Prüfung fehlen Arbeitslosigkeitsstatus, Meldung oder Versicherungszeiten.',need(p,[['employmentStatus','Beschäftigungsstatus'],['unemployedRegistered','Arbeitslos gemeldet?'],['insuranceMonths30','Versicherungsmonate in den letzten 30 Monaten']]),'alg'));

  // Krankengeld
  if(claimYes(p,'longSick6Weeks') && claimVal(p,'healthInsuranceType')==='statutory' && claimVal(p,'employmentStatus')==='employed') out.push(claimResult('krankengeld','Krankengeld','🤒','Gesundheit','likely','Beschäftigung, gesetzliche Krankenversicherung und Arbeitsunfähigkeit über sechs Wochen sind hinterlegt.',[],'krankengeld'));
  else if(claimVal(p,'healthInsuranceType')==='private') out.push(claimResult('krankengeld','Krankengeld','🤒','Gesundheit','none','Private Krankenversicherung ist hinterlegt; gesetzliches Krankengeld nach SGB V ist damit nicht die Standardleistung. Tarifleistungen separat prüfen.',[],'krankengeld'));
  else out.push(claimResult('krankengeld','Krankengeld','🤒','Gesundheit','check','Relevant sind Beschäftigung, gesetzliche Krankenversicherung und längere Arbeitsunfähigkeit.',need(p,[['healthInsuranceType','Krankenversicherungsart'],['longSick6Weeks','Länger als sechs Wochen arbeitsunfähig?'],['employmentStatus','Beschäftigungsstatus']]),'krankengeld'));

  // Kinderkrankengeld
  if(claimYes(p,'childCareIllNow') && claimVal(p,'healthInsuranceType')==='statutory' && claimYes(p,'childStatutoryHealth') && claimYes(p,'childUnder12OrDisabled')) out.push(claimResult('kinderkrankengeld','Kinderkrankengeld','🩹','Gesundheit','likely','Erkranktes betreuungsbedürftiges Kind, gesetzliche Versicherung und Alters-/Behinderungskriterium sind hinterlegt.',[],'kinderkrankengeld'));
  else if(claimNo(p,'childCareIllNow')) out.push(claimResult('kinderkrankengeld','Kinderkrankengeld','🩹','Gesundheit','none','Aktuell ist kein Betreuungsbedarf wegen eines erkrankten Kindes hinterlegt.',[],'kinderkrankengeld'));
  else out.push(claimResult('kinderkrankengeld','Kinderkrankengeld','🩹','Gesundheit','check','Diese Leistung ist ereignisbezogen. Entscheidend sind Erkrankung/Betreuung, gesetzliche Versicherung und Alter bzw. Behinderung des Kindes.',need(p,[['childCareIllNow','Kind aktuell krank und Betreuung verhindert Arbeit?'],['childStatutoryHealth','Kind gesetzlich versichert?'],['childUnder12OrDisabled','Kind unter 12 oder behindert und hilfebedürftig?']]),'kinderkrankengeld'));


  // Übersehene Leistungen der Krankenversicherung
  if(claimVal(p,'healthInsuranceType')==='statutory'&&claimYes(p,'gkvCopaysHigh')) out.push(claimResult('gkv_zuzahlung','Zuzahlungsbefreiung der Krankenkasse','💊','Gesundheit','check',claimYes(p,'severeChronic')?'Hohe gesetzliche Zuzahlungen und eine schwerwiegend chronische Erkrankung sind hinterlegt; die reduzierte Belastungsgrenze sollte von der Krankenkasse berechnet werden.':'Hohe gesetzliche Zuzahlungen sind hinterlegt; die persönliche Belastungsgrenze sollte von der Krankenkasse berechnet werden.',[],'gkv_zuzahlung'));
  else if(claimVal(p,'healthInsuranceType')==='private') out.push(claimResult('gkv_zuzahlung','Zuzahlungsbefreiung der Krankenkasse','💊','Gesundheit','none','Private Krankenversicherung hinterlegt; die gesetzliche GKV-Belastungsgrenze ist hier nicht der passende Leistungsweg.',[],'gkv_zuzahlung'));
  else out.push(claimResult('gkv_zuzahlung','Zuzahlungsbefreiung der Krankenkasse','💊','Gesundheit','check','Wer viele gesetzliche Zuzahlungen leistet, kann nach Erreichen der persönlichen Belastungsgrenze eine Befreiung bzw. Erstattung beantragen.',need(p,[['healthInsuranceType','Krankenversicherungsart'],['gkvCopaysHigh','Hohe Zuzahlungen im laufenden Jahr?']]),'gkv_zuzahlung'));

  if(claimVal(p,'healthInsuranceType')==='statutory'&&claimYes(p,'householdHelpNeeded')) out.push(claimResult('haushaltshilfe','Haushaltshilfe der Krankenkasse','🧹','Gesundheit','check','Gesetzliche Krankenversicherung und ein krankheits-/behandlungsbedingter Ausfall der Haushaltsführung sind hinterlegt. Die konkreten Voraussetzungen sollte die Krankenkasse prüfen.',[],'haushaltshilfe'));
  else out.push(claimResult('haushaltshilfe','Haushaltshilfe der Krankenkasse','🧹','Gesundheit','check','Bei Krankheit, Krankenhaus/Reha oder ähnlichen Situationen kann die Krankenkasse unter Voraussetzungen eine Haushaltshilfe übernehmen.',need(p,[['healthInsuranceType','Krankenversicherungsart'],['householdHelpNeeded','Haushalt kann wegen Krankheit/Behandlung nicht weitergeführt werden?']]),'haushaltshilfe'));

  if(claimVal(p,'healthInsuranceType')==='statutory'&&claimYes(p,'dentalTreatmentPlanned')&&incomeTight(p)) out.push(claimResult('zahnersatz_haertefall','Zahnersatz-Härtefall','🦷','Gesundheit','check','Gesetzliche Krankenversicherung, geplanter Zahnersatz und knappes Einkommen sind hinterlegt. Härtefall bzw. gleitender Härtefall sollten vor Behandlung geprüft werden.',[],'zahnersatz_haertefall'));
  else out.push(claimResult('zahnersatz_haertefall','Zahnersatz-Härtefall','🦷','Gesundheit','check','Bei geringem Einkommen kann der Eigenanteil für die Regelversorgung deutlich sinken oder entfallen.',need(p,[['healthInsuranceType','Krankenversicherungsart'],['dentalTreatmentPlanned','Zahnersatz geplant?'],['incomeSituation','Einkommenssituation']]),'zahnersatz_haertefall'));

  // BAB
  if(claimVal(p,'educationStatus')==='vocational' && claimVal(p,'trainingType')==='dual' && claimNo(p,'livingWithParents') && claimYes(p,'educationIncomeTight')) out.push(claimResult('bab','Berufsausbildungsbeihilfe (BAB)','🛠️','Ausbildung','check','Betriebliche Ausbildung, eigener Haushalt und knappe Mittel sprechen für eine BAB-Prüfung. Einkommen der auszubildenden Person und ggf. der Eltern/Partnerperson wird berücksichtigt.',[],'bab'));
  else if(claimVal(p,'educationStatus')==='vocational' && claimVal(p,'trainingType')==='school') out.push(claimResult('bab','Berufsausbildungsbeihilfe (BAB)','🛠️','Ausbildung','none','Eine schulische Ausbildung ist als Ausbildungsart hinterlegt; dafür ist BAB regelmäßig nicht die passende Leistung. BAföG prüfen.',[],'bab'));
  else out.push(claimResult('bab','Berufsausbildungsbeihilfe (BAB)','🛠️','Ausbildung','check','Für BAB sind insbesondere betriebliche Ausbildung, Wohnsituation und finanzielle Situation wichtig.',need(p,[['educationStatus','Ausbildungsstatus'],['trainingType','Betriebliche/duale oder schulische Ausbildung?'],['livingWithParents','Bei den Eltern wohnhaft?'],['educationIncomeTight','Reicht Ausbildungsvergütung/Einkommen?']]),'bab'));

  // BAföG
  if(['study','school'].includes(claimVal(p,'educationStatus')) && claimYes(p,'educationFullTime') && (age===null||age<45) && claimYes(p,'educationIncomeTight')) out.push(claimResult('bafoeg','BAföG','🎓','Ausbildung','check','Vollzeit-Studium/-Schule, Alter und knappe Mittel sprechen für eine BAföG-Prüfung. Ausbildungsstätte, eigenes Vermögen sowie Eltern-/Partnereinkommen müssen genauer geprüft werden.',[],'bafoeg'));
  else if(age!==null && age>=45 && ['study','school'].includes(claimVal(p,'educationStatus'))) out.push(claimResult('bafoeg','BAföG','🎓','Ausbildung','check','Die allgemeine Altersgrenze ist überschritten; gesetzliche Ausnahmen sind möglich und sollten geprüft werden.',[],'bafoeg'));
  else out.push(claimResult('bafoeg','BAföG','🎓','Ausbildung','check','Für die Vorauswahl sind Art und Umfang der Ausbildung sowie finanzielle Situation maßgeblich.',need(p,[['educationStatus','Schule/Studium/Ausbildung?'],['educationFullTime','Vollzeit?'],['educationIncomeTight','Finanzielle Mittel knapp?']]),'bafoeg'));

  // Pflegeleistungen allgemein
  const pg=Number(claimVal(p,'careGrade')||0);
  if(pg>=1) out.push(claimResult('pflege','Leistungen der Pflegeversicherung','🧑‍🦽','Pflege','likely',`Pflegegrad ${pg} ist hinterlegt. Damit kommen je nach Situation mehrere Leistungen der Pflegeversicherung in Betracht.`,[],'pflege'));
  else if(claimVal(p,'careGrade')==='0') out.push(claimResult('pflege','Leistungen der Pflegeversicherung','🧑‍🦽','Pflege','none','Kein Pflegegrad hinterlegt.',[],'pflege'));
  else out.push(claimResult('pflege','Leistungen der Pflegeversicherung','🧑‍🦽','Pflege','check','Ein vorhandener Pflegegrad ist der wichtigste Auslöser für Leistungen der Pflegeversicherung.',['Pflegegrad'],'pflege'));

  // Pflegegeld
  if(pg>=2 && claimYes(p,'homeCare')) out.push(claimResult('pflegegeld','Pflegegeld / häusliche Pflege','🏡','Pflege','likely','Pflegegrad 2 oder höher und häusliche Pflege sind hinterlegt. Art und Kombination der Pflegeleistungen sollten mit der Pflegekasse abgestimmt werden.',[],'pflegegeld'));
  else if(pg===1) out.push(claimResult('pflegegeld','Pflegegeld / häusliche Pflege','🏡','Pflege','none','Pflegegrad 1 ist hinterlegt; klassisches Pflegegeld setzt einen höheren Pflegegrad voraus, andere Pflegeleistungen sind aber möglich.',[],'pflegegeld'));
  else out.push(claimResult('pflegegeld','Pflegegeld / häusliche Pflege','🏡','Pflege','check','Für die Prüfung sind Pflegegrad und häusliche Pflegesituation erforderlich.',need(p,[['careGrade','Pflegegrad'],['homeCare','Häusliche Pflege?']]),'pflegegeld'));


  // Folgeansprüche Pflege
  if(pg>=1) out.push(claimResult('pflege_entlastung','Entlastungsbetrag Pflege','🧺','Pflege','likely',`Pflegegrad ${pg} ist hinterlegt. Der zweckgebundene Entlastungsbetrag sollte als eigener Pflegebaustein berücksichtigt werden.`,[],'pflege_entlastung'));
  else out.push(claimResult('pflege_entlastung','Entlastungsbetrag Pflege','🧺','Pflege','check','Der Entlastungsbetrag setzt mindestens Pflegegrad 1 voraus.',need(p,[['careGrade','Pflegegrad']]),'pflege_entlastung'));

  if(pg>=1&&claimYes(p,'homeCare')) out.push(claimResult('pflege_hilfsmittel','Pflegehilfsmittel','🧤','Pflege','likely','Pflegegrad und häusliche Pflege sind hinterlegt. Pflegehilfsmittel bzw. zum Verbrauch bestimmte Hilfsmittel sollten mit der Pflegekasse geprüft werden.',[],'pflege_hilfsmittel'));
  else out.push(claimResult('pflege_hilfsmittel','Pflegehilfsmittel','🧤','Pflege','check','Pflegehilfsmittel sind besonders bei Pflegegrad und häuslicher Pflege relevant.',need(p,[['careGrade','Pflegegrad'],['homeCare','Häusliche Pflege?']]),'pflege_hilfsmittel'));

  if(pg>=1&&claimYes(p,'homeCare')) out.push(claimResult('pflege_wohnumfeld','Zuschuss für Wohnungsanpassung','🚿','Pflege','check','Pflegegrad und häusliche Pflege sind hinterlegt. Bei Barrieren oder Pflegeproblemen sollte ein Zuschuss für wohnumfeldverbessernde Maßnahmen vor Beauftragung geprüft werden.',[],'pflege_wohnumfeld'));
  else out.push(claimResult('pflege_wohnumfeld','Zuschuss für Wohnungsanpassung','🚿','Pflege','check','Bereits ab Pflegegrad 1 kann eine wohnumfeldverbessernde Maßnahme förderfähig sein.',need(p,[['careGrade','Pflegegrad'],['homeCare','Häusliche Pflege?']]),'pflege_wohnumfeld'));

  if(pg>=2&&claimYes(p,'homeCare')) out.push(claimResult('pflege_ersatzpflege','Verhinderungs- & Kurzzeitpflege','🔄','Pflege','check','Pflegegrad 2 oder höher und häusliche Pflege sind hinterlegt. Für Ausfallzeiten der Pflegeperson bzw. vorübergehende stationäre Pflege sollte das gemeinsame Budget geprüft werden.',[],'pflege_ersatzpflege'));
  else out.push(claimResult('pflege_ersatzpflege','Verhinderungs- & Kurzzeitpflege','🔄','Pflege','check','Diese Leistungen werden besonders ab Pflegegrad 2 relevant.',need(p,[['careGrade','Pflegegrad'],['homeCare','Häusliche Pflege?']]),'pflege_ersatzpflege'));

  if(claimVal(p,'employmentStatus')==='employed'&&claimYes(p,'caresForRelativeAcute')) out.push(claimResult('pflegeunterstuetzungsgeld','Pflegeunterstützungsgeld','⏱️','Pflege Angehörige','check','Beschäftigung und eine akut zu organisierende Pflegesituation eines nahen Angehörigen sind hinterlegt. Kurzzeitige Arbeitsverhinderung und Entgeltersatz sollten sofort geprüft werden.',[],'pflegeunterstuetzungsgeld'));
  else out.push(claimResult('pflegeunterstuetzungsgeld','Pflegeunterstützungsgeld','⏱️','Pflege Angehörige','check','Relevant, wenn Beschäftigte kurzfristig die Pflege eines nahen Angehörigen organisieren müssen.',need(p,[['employmentStatus','Beschäftigungsstatus'],['caresForRelativeAcute','Akute Pflegesituation eines nahen Angehörigen?']]),'pflegeunterstuetzungsgeld'));

  const careRecipientGrade=Number(claimVal(p,'careRecipientGrade')||0);
  if(claimYes(p,'caresForRelativeUnpaid')&&careRecipientGrade>=2) out.push(claimResult('pflege_pauschbetrag','Pflege-Pauschbetrag (Steuer)','🧾','Steuer','check',`Unentgeltliche persönliche Pflege und Pflegegrad ${careRecipientGrade} der gepflegten Person sind hinterlegt. Der steuerliche Pflege-Pauschbetrag sollte geprüft werden.`,[],'pflege_pauschbetrag'));
  else out.push(claimResult('pflege_pauschbetrag','Pflege-Pauschbetrag (Steuer)','🧾','Steuer','check','Wer eine andere Person persönlich und unentgeltlich pflegt, kann je nach Pflegegrad einen steuerlichen Pauschbetrag erhalten.',need(p,[['caresForRelativeUnpaid','Andere Person unentgeltlich gepflegt?'],['careRecipientGrade','Pflegegrad der gepflegten Person']]),'pflege_pauschbetrag'));

  // Erwerbsminderungsrente
  if((claimVal(p,'workCapacity')==='under3'||claimYes(p,'permanentFullReduction')) && claimYes(p,'pension5Years') && claimYes(p,'pension3of5')) out.push(claimResult('em','Erwerbsminderungsrente','♿','Rente','check','Stark eingeschränkte Erwerbsfähigkeit sowie die typischen Versicherungszeiten sind hinterlegt. Die medizinische und versicherungsrechtliche Prüfung erfolgt durch die Rentenversicherung.',[],'em'));
  else out.push(claimResult('em','Erwerbsminderungsrente','♿','Rente','check','Für die Vorauswahl sind Leistungsvermögen und rentenrechtliche Versicherungszeiten entscheidend.',need(p,[['workCapacity','Tägliches Leistungsvermögen'],['pension5Years','Allgemeine Wartezeit von 5 Jahren erfüllt?'],['pension3of5','3 Jahre Pflichtbeiträge in den letzten 5 Jahren?']]),'em'));

  // Grundsicherung Alter / volle EM
  if(incomeInsufficient(p) && (p.life?.pensioner==='yes'||claimYes(p,'permanentFullReduction'))) out.push(claimResult('grundsicherungAlter','Grundsicherung im Alter / bei Erwerbsminderung','🧓','Rente','check','Nicht ausreichendes Einkommen und Rentenbezug bzw. dauerhafte volle Erwerbsminderung sind hinterlegt. Zuständigkeit und Bedarfsberechnung müssen geprüft werden.',[],'grundsicherungAlter'));
  else out.push(claimResult('grundsicherungAlter','Grundsicherung im Alter / bei Erwerbsminderung','🧓','Rente','check','Relevant ist insbesondere Bedürftigkeit zusammen mit Regelaltersgrenze oder dauerhafter voller Erwerbsminderung.',need(p,[['incomeSituation','Reicht das Einkommen?'],['permanentFullReduction','Dauerhaft voll erwerbsgemindert?']]),'grundsicherungAlter'));


  // Arbeit, Ausbildung und leicht übersehene Förderungen
  if((claimVal(p,'employmentStatus')==='unemployed'||currentGS)&&claimYes(p,'jobSearchCosts')) out.push(claimResult('vermittlungsbudget','Vermittlungsbudget','🧳','Arbeit','check','Arbeitssuche/Jobcenter-Bezug und konkrete Bewerbungs- oder Vorstellungskosten sind hinterlegt. Vor Entstehung weiterer Kosten sollte die Förderung abgestimmt werden.',[],'vermittlungsbudget'));
  else out.push(claimResult('vermittlungsbudget','Vermittlungsbudget','🧳','Arbeit','check','Bewerbungen, Vorstellungsgespräche, Dokumente, Arbeitsmittel oder ein notwendiger Umzug können unter Umständen gefördert werden.',need(p,[['jobSearchCosts','Kosten rund um Arbeits-/Ausbildungsplatzsuche?']]),'vermittlungsbudget'));

  if(claimVal(p,'educationStatus')==='vocational'&&claimVal(p,'trainingType')==='dual'&&claimYes(p,'trainingFarAwayRequiresMove')) out.push(claimResult('mobilitaetszuschuss','Mobilitätszuschuss Ausbildung','🚆','Ausbildung','check','Betriebliche Ausbildung und notwendiger Umzug wegen großer Entfernung sind hinterlegt. Die Förderung muss vor Ausbildungsbeginn abgestimmt werden und ist eine Ermessensleistung.',[],'mobilitaetszuschuss'));
  else out.push(claimResult('mobilitaetszuschuss','Mobilitätszuschuss Ausbildung','🚆','Ausbildung','check','Bei Ausbildungsaufnahme weit außerhalb des üblichen Tagespendelbereichs kann ein Mobilitätszuschuss für Familienheimfahrten möglich sein.',need(p,[['educationStatus','Betriebliche Ausbildung?'],['trainingFarAwayRequiresMove','Ausbildungsort so weit entfernt, dass Umzug nötig ist?']]),'mobilitaetszuschuss'));

  if(claimYes(p,'fundedQualificationTraining')) out.push(claimResult('weiterbildungsgeld','Weiterbildungsgeld & Weiterbildungskosten','📘','Arbeit','likely','Eine geförderte abschlussorientierte Weiterbildung ist hinterlegt. Weiterbildungsgeld und zusätzliche notwendige Kosten sollten im Förderbescheid geprüft werden.',[],'weiterbildungsgeld'));
  else out.push(claimResult('weiterbildungsgeld','Weiterbildungsgeld & Weiterbildungskosten','📘','Arbeit','check','Bei einer geförderten abschlussorientierten Weiterbildung können zusätzliches Weiterbildungsgeld und weitere Kostenübernahmen möglich sein.',need(p,[['fundedQualificationTraining','Geförderte abschlussorientierte Weiterbildung?']]),'weiterbildungsgeld'));

  if(claimYes(p,'employerInsolventUnpaidWages')) out.push(claimResult('insolvenzgeld','Insolvenzgeld','🏢','Arbeit','likely','Arbeitgeberinsolvenz bzw. ausgefallener Lohn ist hinterlegt. Wegen der kurzen Antragsfrist sollte Insolvenzgeld sofort geprüft werden.',[],'insolvenzgeld'));
  else out.push(claimResult('insolvenzgeld','Insolvenzgeld','🏢','Arbeit','check','Wenn ein Arbeitgeber wegen Insolvenz Lohn nicht zahlt, kann Insolvenzgeld die letzten Monate des ausgefallenen Entgelts absichern.',need(p,[['employerInsolventUnpaidWages','Arbeitgeber insolvent / Lohn ausgefallen?']]),'insolvenzgeld'));

  // Steuerentlastungen und Schwerbehinderung
  if(claimYes(p,'childUnder14')&&claimYes(p,'paidChildcareCosts')) out.push(claimResult('kinderbetreuung_steuer','Kinderbetreuungskosten steuerlich absetzen','🧾','Steuer','likely','Kind unter 14 und bezahlte Betreuungskosten sind hinterlegt. Die steuerliche Berücksichtigung sollte mit Rechnungen und unbarer Zahlung genutzt werden.',[],'kinderbetreuung_steuer'));
  else out.push(claimResult('kinderbetreuung_steuer','Kinderbetreuungskosten steuerlich absetzen','🧾','Steuer','check','Betreuungskosten für jüngere Kinder können steuerlich berücksichtigt werden.',need(p,[['childUnder14','Kind unter 14?'],['paidChildcareCosts','Bezahlte Kinderbetreuungskosten?']]),'kinderbetreuung_steuer'));

  if(claimYes(p,'singleParent')&&claimYes(p,'receivesChildBenefit')&&claimNo(p,'otherAdultInHousehold')) out.push(claimResult('entlastungsbetrag_alleinerziehend','Entlastungsbetrag für Alleinerziehende','🧾','Steuer','likely','Alleinerziehend, Kindergeldberechtigung und keine weitere volljährige Person im Haushalt sind hinterlegt. Steuerklasse II bzw. der Entlastungsbetrag sollten geprüft sein.',[],'entlastungsbetrag_alleinerziehend'));
  else out.push(claimResult('entlastungsbetrag_alleinerziehend','Entlastungsbetrag für Alleinerziehende','🧾','Steuer','check','Alleinstehende Alleinerziehende können einen zusätzlichen steuerlichen Entlastungsbetrag erhalten.',need(p,[['singleParent','Alleinerziehend?'],['receivesChildBenefit','Kindergeldberechtigung?'],['otherAdultInHousehold','Weitere volljährige Person im Haushalt?']]),'entlastungsbetrag_alleinerziehend'));

  const gdb=claimNum(p,'disabilityDegree');
  if(gdb!==null&&gdb>=20) out.push(claimResult('behinderten_pauschbetrag','Behinderten-Pauschbetrag (Steuer)','♿','Steuer','likely',`Ein festgestellter GdB von ${gdb} ist hinterlegt. Der steuerliche Behinderten-Pauschbetrag sollte berücksichtigt werden.`,[],'behinderten_pauschbetrag'));
  else if(gdb!==null&&gdb<20) out.push(claimResult('behinderten_pauschbetrag','Behinderten-Pauschbetrag (Steuer)','♿','Steuer','none','Der hinterlegte GdB liegt unter der allgemeinen gesetzlichen Einstiegsschwelle für den Behinderten-Pauschbetrag.',[],'behinderten_pauschbetrag'));
  else out.push(claimResult('behinderten_pauschbetrag','Behinderten-Pauschbetrag (Steuer)','♿','Steuer','check','Ab einem amtlich festgestellten GdB von 20 kann ein steuerlicher Pauschbetrag relevant sein.',need(p,[['disabilityDegree','Festgestellter Grad der Behinderung (GdB)']]),'behinderten_pauschbetrag'));

  const markerVal=claimVal(p,'disabilityMarker');
  if(['aG','H','Bl','G','Gl'].includes(markerVal)) out.push(claimResult('schwerbehinderten_mobilitaet','Mobilitäts-/Kfz-Steuervorteile bei Schwerbehinderung','🚗','Schwerbehinderung','check',`Merkzeichen ${markerVal} ist hinterlegt. Je nach Merkzeichen kommen Kfz-Steuerbefreiung/-ermäßigung und weitere Mobilitätsvergünstigungen in Betracht.`,[],'schwerbehinderten_mobilitaet'));
  else out.push(claimResult('schwerbehinderten_mobilitaet','Mobilitäts-/Kfz-Steuervorteile bei Schwerbehinderung','🚗','Schwerbehinderung','check','Bestimmte Merkzeichen im Schwerbehindertenausweis können zusätzliche Mobilitäts- oder Kfz-Steuervorteile auslösen.',need(p,[['disabilityMarker','Merkzeichen im Schwerbehindertenausweis']]),'schwerbehinderten_mobilitaet'));

  // Witwen-/Witwerrente
  if(claimYes(p,'remarriedAfterDeath')) out.push(claimResult('witwen','Witwen-/Witwerrente','🕯️','Hinterbliebene','none','Eine erneute Heirat/Lebenspartnerschaft nach dem Todesfall ist hinterlegt; die laufende Witwen-/Witwerrente fällt dann grundsätzlich weg. Eine Rentenabfindung kann gesondert zu prüfen sein.',[],'witwen'));
  else if(claimYes(p,'spouseDeceased') && claimYes(p,'marriedAtDeath') && claimYes(p,'marriageOneYear') && claimYes(p,'deceasedPensionEligible') && claimNo(p,'remarriedAfterDeath')) out.push(claimResult('witwen','Witwen-/Witwerrente','🕯️','Hinterbliebene','likely','Tod der Ehe-/Lebenspartnerperson, bestehende Partnerschaft, Mindestdauer, Renten-Wartezeit/Rentenbezug und keine erneute Heirat sind hinterlegt.',[],'witwen'));
  else if(claimYes(p,'spouseDeceased') && claimNo(p,'marriageOneYear')) out.push(claimResult('witwen','Witwen-/Witwerrente','🕯️','Hinterbliebene','check','Die Ehe/Lebenspartnerschaft bestand laut Angabe unter einem Jahr. Es gibt gesetzliche Ausnahmen, etwa bei einem Unfalltod, deshalb nicht automatisch ausschließen.',[],'witwen'));
  else out.push(claimResult('witwen','Witwen-/Witwerrente','🕯️','Hinterbliebene','check','Nur bei einem Todesfall der Ehe-/Lebenspartnerperson relevant. Die detaillierte Fallprüfung bleibt zusätzlich im Todesfall-Modul.',need(p,[['spouseDeceased','Ehe-/Lebenspartner verstorben?'],['marriedAtDeath','Zum Todeszeitpunkt verheiratet/verpartnert?'],['marriageOneYear','Partnerschaft mindestens ein Jahr?'],['deceasedPensionEligible','Verstorbene Person Renten-Wartezeit erfüllt/Rente bezogen?'],['remarriedAfterDeath','Nach dem Todesfall erneut geheiratet/verpartnert?']]),'witwen'));

  // Waisenrente
  if(claimYes(p,'parentDeceased') && claimYes(p,'deceasedParentPensionEligible') && age!==null && age<18) out.push(claimResult('waisen','Waisenrente','🕯️','Hinterbliebene','likely','Ein verstorbener Elternteil, dessen Renten-Wartezeit/Rentenbezug und Alter unter 18 sind hinterlegt.',[],'waisen'));
  else if(claimYes(p,'parentDeceased') && claimYes(p,'deceasedParentPensionEligible') && age!==null && age<27 && claimYes(p,'orphanEligibleActivity')) out.push(claimResult('waisen','Waisenrente','🕯️','Hinterbliebene','likely','Verstorbener Elternteil mit Renten-Wartezeit/Rentenbezug sowie ein relevanter Ausbildungs-/Freiwilligendienststatus vor dem 27. Geburtstag sind hinterlegt.',[],'waisen'));
  else if(age!==null && age>=27) out.push(claimResult('waisen','Waisenrente','🕯️','Hinterbliebene','none','Die reguläre Altersgrenze für eine Waisenrente ist überschritten.',[],'waisen'));
  else out.push(claimResult('waisen','Waisenrente','🕯️','Hinterbliebene','check','Relevant bei Tod eines Elternteils; ab 18 hängt eine Weiterzahlung insbesondere von Ausbildung/Studium/Freiwilligendienst ab.',need(p,[['parentDeceased','Elternteil verstorben?'],['deceasedParentPensionEligible','Verstorbener Elternteil Renten-Wartezeit erfüllt/Rente bezogen?'],['orphanEligibleActivity','Ausbildung/Studium/Freiwilligendienst?']]),'waisen'));

  return out;
}

function claimCheckability(p){
  if(!p)return 0;
  const checks=[
    !!p.profile?.birthDate,
    !!p.profile?.zip,
    !!p.profile?.maritalStatus,
    !!claimVal(p,'householdSize'),
    !!claimVal(p,'incomeSituation'),
    !!claimVal(p,'employmentStatus'),
    !!claimVal(p,'healthInsuranceType'),
    !claimUnknown(p,'childUnder18')||!claimUnknown(p,'child18to24Eligible'),
    !!claimVal(p,'educationStatus'),
    !!claimVal(p,'careGrade')
  ];
  return Math.round(checks.filter(Boolean).length/checks.length*100);
}

function claimSuggestions(p){
  const a=[];
  const add=(key,label,group,why)=>{if(!a.some(x=>x.key===key))a.push({key,label,group,why})};
  if(!p.profile?.zip)add('zip','Wohnort / PLZ ergänzen','claim-base','für Wohngeld und örtliche Zuständigkeiten');
  if(!p.profile?.maritalStatus)add('marital','Familienstand ergänzen','claim-base','für Familien- und Hinterbliebenenleistungen');
  if(!claimVal(p,'householdSize'))add('householdSize','Haushaltsgröße ergänzen','claim-household','für Wohngeld und einkommensabhängige Leistungen');
  if(!claimVal(p,'incomeSituation'))add('income','Einkommenssituation einordnen','claim-income','für KiZ, Wohngeld und Grundsicherung');
  if(!claimVal(p,'employmentStatus'))add('work','Beschäftigungsstatus ergänzen','claim-work','für Arbeitslosen-, Kranken- und Familienleistungen');
  if(!claimVal(p,'healthInsuranceType'))add('health','Krankenversicherungsart ergänzen','claim-health','für Krankengeld, Kinderkrankengeld und Mutterschaftsgeld');
  if(claimUnknown(p,'childUnder18')&&claimUnknown(p,'child18to24Eligible'))add('children','Kinderstatus ergänzen','claim-family','für Kindergeld, KiZ und Bildung & Teilhabe');
  if(!claimVal(p,'educationStatus'))add('education','Ausbildungsstatus ergänzen','claim-education','für BAB, BAföG und Kindergeld ab 18');
  if(!claimVal(p,'careGrade'))add('care','Pflegegrad ergänzen','claim-care','für Pflegeleistungen');
  if(childSignal(p)===true&&claimUnknown(p,'hasSchoolChild'))add('school','Schule/Kita ergänzen','claim-family','für Klassenfahrten, Mittagessen, Schulbedarf und Nachhilfe');
  if(claimVal(p,'healthInsuranceType')==='statutory'&&claimUnknown(p,'gkvCopaysHigh'))add('copay','Zuzahlungen ergänzen','claim-health','für mögliche Zuzahlungsbefreiung');
  if(Number(claimVal(p,'careGrade')||0)>=1&&claimUnknown(p,'homeCare'))add('homecare','Pflegesituation ergänzen','claim-care','für Pflegehilfsmittel, Entlastung und Wohnungsumbau');
  return a.slice(0,3);
}

function claimStatusLabel(s){return s==='likely'?'wahrscheinlich relevant':s==='check'?'prüfen':'derzeit kein Hinweis'}
function claimRequirements(r){
  const req=CLAIM_REQUIREMENTS[r.id]||[];
  if(!req.length)return '';
  const miss=r.missing?.filter(Boolean)||[];
  const statusNote=r.status==='likely'
    ?'Deine bisherigen Angaben passen zu den wichtigsten Auslösern. Die Behörde prüft trotzdem alle Voraussetzungen im Einzelfall.'
    :r.status==='check'
      ?'Ein Anspruch ist noch offen. Ergänze fehlende Angaben und prüfe anschließend die vollständigen Voraussetzungen.'
      :'Mindestens ein typischer Auslöser passt nach den bisherigen Angaben nicht. Ausnahmen oder andere Leistungswege können trotzdem bestehen.';
  return `<details class="claim-requirements"><summary>Voraussetzungen anzeigen</summary><div class="claim-requirements-body"><div class="claim-requirements-state ${r.status}">${esc(statusNote)}</div><b>Wesentliche Voraussetzungen</b><ul>${req.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${miss.length?`<div class="claim-requirements-open"><b>Für deine Prüfung noch offen:</b><span>${miss.map(esc).join(' · ')}</span></div>`:''}<small>Vereinfachte Vorauswahl. Sonderregeln und weitere Detailvoraussetzungen sind möglich.</small></div></details>`;
}
function claimCard(r){
  const miss=r.missing?.filter(Boolean)||[];
  return `<article class="claim-card ${r.status}"><div class="claim-head"><div class="claim-icon">${r.icon}</div><div class="grow"><small>${esc(r.category)}</small><h3>${esc(r.title)}</h3></div><span class="claim-status ${r.status}">${esc(claimStatusLabel(r.status))}</span></div><p>${esc(r.reason)}</p>${miss.length?`<div class="claim-missing"><b>Noch hilfreich:</b> ${miss.slice(0,3).map(esc).join(' · ')}${miss.length>3?` · +${miss.length-3}`:''}</div>`:''}${claimRequirements(r)}<div class="claim-actions"><a href="${esc(r.source)}" target="_blank" rel="noopener">Offizielle Quelle ↗</a><small>Regelstand ${esc(r.verified)}</small></div></article>`
}

function claimGroup(id,title,desc,inner,open=false){return `<details class="claim-group" id="${id}" ${open?'open':''}><summary><span><b>${esc(title)}</b><small>${esc(desc)}</small></span><strong>＋</strong></summary><div class="claim-group-body">${inner}</div></details>`}
function clTri(label,key,val0='unknown',hint=''){return triSelect(label,'cl_'+key,val0||'unknown',hint)}
function clSelect(label,key,val0,opts){return selectField(label,'cl_'+key,val0||'',opts)}
function clField(label,key,val0='',type='text',hint=''){return field(label,'cl_'+key,val0||'',type,hint)}

function claimsScreen(){
  const p=activePerson();if(!p)return noPerson('Ansprüche & Leistungen');normalizePerson(p);p.claimProfile=p.claimProfile||{};const c={...p.claimProfile};if(!c.employmentStatus)c.employmentStatus=claimVal(p,'employmentStatus');if(!c.pension5Years)c.pension5Years=claimVal(p,'pension5Years');
  const results=evaluateClaims(p),likely=results.filter(x=>x.status==='likely'),check=results.filter(x=>x.status==='check'),none=results.filter(x=>x.status==='none'),coreLikely=likely.filter(x=>!CLAIM_FOLLOWUP_IDS.has(x.id)),coreCheck=check.filter(x=>!CLAIM_FOLLOWUP_IDS.has(x.id)),coreNone=none.filter(x=>!CLAIM_FOLLOWUP_IDS.has(x.id)),followLikely=likely.filter(x=>CLAIM_FOLLOWUP_IDS.has(x.id)),followCheck=check.filter(x=>CLAIM_FOLLOWUP_IDS.has(x.id)),followNone=none.filter(x=>CLAIM_FOLLOWUP_IDS.has(x.id)),pct=claimCheckability(p),suggest=claimSuggestions(p);
  const baseMissing=[];if(!p.profile?.zip)baseMissing.push('PLZ');if(!p.profile?.maritalStatus)baseMissing.push('Familienstand');
  const baseCard=baseMissing.length?`<div class="notice compact"><b>Basisdaten fehlen:</b> ${esc(baseMissing.join(', '))}. Diese kannst du unter Stammdaten ergänzen. <button class="inline-link" onclick="go('profile')">Stammdaten öffnen</button></div>`:'';
  return `<section class="screen">${appTop('Ansprüche & Leistungen',`Für ${personName(p)}`)}<div class="content">${personSwitch(p)}
    <div class="claim-hero"><div class="claim-meter"><b>${pct}%</b><span>prüfbar</span></div><div class="grow"><h2>${likely.length} wahrscheinlich relevante ${likely.length===1?'Leistung':'Leistungen'}</h2><p>Die App prüft Haupt- und Folgeansprüche und fragt Zusatzdaten nur bei Bedarf ab.</p></div></div>
    ${baseCard}
    ${suggest.length?`<div class="claim-next"><div class="section-title"><h2>Mit 3 Angaben deutlich genauer</h2></div>${suggest.map((s,i)=>`<button onclick="${s.group==='claim-base'?"go('profile')":`openClaimGroup('${s.group}')`}"><span>${i+1}</span><div><b>${esc(s.label)}</b><small>${esc(s.why)}</small></div><strong>›</strong></button>`).join('')}</div>`:''}
    <div class="section-title"><h2>Hat sich etwas verändert?</h2></div><div class="life-events">
      <button onclick="openClaimGroup('claim-family')">👶<span>Kind / Schwangerschaft</span></button>
      <button onclick="openClaimGroup('claim-work')">💼<span>Arbeit verloren / begonnen</span></button>
      <button onclick="openClaimGroup('claim-health')">🤒<span>Länger krank</span></button>
      <button onclick="openClaimGroup('claim-care')">♿<span>Pflege / Einschränkung</span></button>
      <button onclick="openClaimGroup('claim-education')">🎓<span>Ausbildung / Studium</span></button>
      <button onclick="openClaimGroup('claim-household')">🏠<span>Umzug / Haushalt</span></button>
      <button onclick="openClaimGroup('claim-income')">💶<span>Einkommen geändert</span></button>
      <button onclick="go('case')">🕯️<span>Todesfall</span></button>
    </div>
    <div class="section-title"><h2>Gefundene Ansprüche</h2><span>${results.length} Prüfungen im Regelwerk</span></div>
    ${coreLikely.length?`<div class="claim-results">${coreLikely.map(claimCard).join('')}</div>`:(!likely.length?`<div class="empty-card compact-empty"><div class="empty-icon">🎯</div><h3>Noch kein eindeutiger Treffer</h3><p>Das ist normal, solange nur wenige optionale Angaben hinterlegt sind.</p></div>`:'')}
    ${followLikely.length?`<details class="claim-none claim-followups"><summary>🎁 ${followLikely.length} zusätzliche Folgeansprüche / Vergünstigungen gefunden</summary><div class="claim-results mt10">${followLikely.map(claimCard).join('')}</div></details>`:''}
    ${coreCheck.length?`<details class="claim-none claim-check-list"><summary>${coreCheck.length} weitere Hauptansprüche prüfen</summary><div class="claim-results mt10">${coreCheck.map(claimCard).join('')}</div></details>`:''}
    ${followCheck.length?`<details class="claim-none claim-followups"><summary>💡 ${followCheck.length} weitere Extras und Folgeansprüche prüfen</summary><div class="claim-results mt10">${followCheck.map(claimCard).join('')}</div></details>`:''}
    ${(coreNone.length||followNone.length)?`<details class="claim-none"><summary>${coreNone.length+followNone.length} derzeit nicht passende Hinweise anzeigen</summary><div class="claim-results mt10">${[...coreNone,...followNone].map(claimCard).join('')}</div></details>`:''}
    <div class="section-title"><h2>Optionale Prüfdaten</h2><span>nur bei Bedarf öffnen</span></div>
    ${claimGroup('claim-household','Haushalt & Wohnen','Haushaltsgröße, Miete/Eigentum',clField('Personen im Haushalt','householdSize',c.householdSize,'number')+clSelect('Wohnform','housingType',c.housingType,['|Bitte auswählen','rent|Miete','own|Eigentum','other|Sonstiges'])+clField('Bruttokaltmiete / monatliche Belastung in €','housingCost',c.housingCost,'number','Für die Vorauswahl reicht ein ungefährer aktueller Wert.'))}
    ${claimGroup('claim-income','Einkommen & Vermögen','nur grob für die Vorauswahl',clSelect('Reicht das Haushaltseinkommen für den Lebensunterhalt?','incomeSituation',c.incomeSituation,['|Bitte auswählen','enough|Ja, ausreichend','tight|Knapp, aber grundsätzlich ausreichend','notEnough|Nein, reicht nicht'])+clField('Haushalts-Nettoeinkommen grob pro Monat in €','householdNetIncome',c.householdNetIncome,'number','Optional. Noch keine verbindliche Leistungsberechnung.')+clSelect('Verwertbares Vermögen grob','assetsBand',c.assetsBand,['|Bitte auswählen','under10|unter 10.000 €','10to50|10.000–50.000 €','50to100|50.000–100.000 €','over100|über 100.000 €','unknown|weiß ich nicht'])+clTri('Kinderzuschlag wird aktuell bezogen?','receivesKiz',c.receivesKiz)+clTri('Wohngeld wird aktuell bezogen?','receivesWohngeld',c.receivesWohngeld)+clTri('Grundsicherungsgeld (Jobcenter) wird aktuell bezogen?','receivesGrundsicherung',c.receivesGrundsicherung)+clTri('Sozialhilfe / Grundsicherung im Alter wird aktuell bezogen?','receivesSocialAssistance',c.receivesSocialAssistance)+clTri('Erstmalige notwendige Wohnungsausstattung fehlt?','needsInitialFurnishing',c.needsInitialFurnishing))}
    ${claimGroup('claim-work','Arbeit','Beschäftigung und Versicherungszeiten',clSelect('Aktueller Status','employmentStatus',c.employmentStatus,['|Bitte auswählen','employed|angestellt','selfemployed|selbstständig','unemployed|arbeitslos','student|Studium','vocational|Ausbildung','school|Schule','pensioner|Rente','notworking|nicht erwerbstätig'])+clField('Wochenarbeitszeit','weeklyHours',c.weeklyHours,'number')+clTri('Bei Arbeitslosigkeit: arbeitslos gemeldet?','unemployedRegistered',c.unemployedRegistered)+clSelect('Versicherungszeiten Arbeitslosenversicherung in den letzten 30 Monaten','insuranceMonths30',c.insuranceMonths30,['|Bitte auswählen','under6|unter 6 Monate','6to11|6–11 Monate','12plus|mindestens 12 Monate','unknown|weiß ich nicht'])+clTri('Entstehen Kosten für Bewerbung, Vorstellungsgespräch, Dokumente oder notwendigen Umzug?','jobSearchCosts',c.jobSearchCosts)+clTri('Arbeitgeber insolvent / Lohn ausgefallen?','employerInsolventUnpaidWages',c.employerInsolventUnpaidWages)+clTri('Geförderte abschlussorientierte Weiterbildung läuft?','fundedQualificationTraining',c.fundedQualificationTraining))}
    ${claimGroup('claim-family','Kinder & Familie','Kindergeld, KiZ und Folgeansprüche',clField('Kinder im Haushalt','childrenInHousehold',c.childrenInHousehold,'number')+clTri('Mindestens ein Kind unter 18?','childUnder18',c.childUnder18)+clTri('Mindestens ein Kind unter 14?','childUnder14',c.childUnder14)+clTri('Mindestens ein Kind 18–24 in Schule/Ausbildung/Studium/Freiwilligendienst?','child18to24Eligible',c.child18to24Eligible)+clTri('Schulkind im Haushalt?','hasSchoolChild',c.hasSchoolChild)+clTri('Kita-/Tagespflegekind im Haushalt?','hasKitaChild',c.hasKitaChild)+clTri('Kindergeld wird bezogen / Anspruch besteht?','receivesChildBenefit',c.receivesChildBenefit)+clTri('Alleinerziehend?','singleParent',c.singleParent)+clTri('Weitere volljährige Person im Haushalt?','otherAdultInHousehold',c.otherAdultInHousehold,'Für den steuerlichen Entlastungsbetrag für Alleinerziehende relevant.')+clSelect('Unterhalt des anderen Elternteils','maintenanceStatus',c.maintenanceStatus,['|Bitte auswählen','regular|regelmäßig / ausreichend','partial|teilweise / unregelmäßig','none|gar nicht','unknown|weiß ich nicht'])+clTri('Schwangerschaft?','pregnant',c.pregnant)+clField('Geburtsdatum jüngstes Kind','youngestChildBirthDate',c.youngestChildBirthDate,'date')+clTri('Jüngstes Kind wird selbst betreut und lebt im gemeinsamen Haushalt?','childCareSelf',c.childCareSelf)+clTri('Zu versteuerndes Jahreseinkommen über 175.000 €?','taxableIncomeOver175k',c.taxableIncomeOver175k,'Nur für die grobe Elterngeld-Vorauswahl.')+clTri('Baby-Erstausstattung wird benötigt?','needsBabyEquipment',c.needsBabyEquipment)+clTri('Klassen-/Kitafahrt oder Ausflug steht an?','schoolTripPlanned',c.schoolTripPlanned)+clTri('Gemeinschaftliches Mittagessen in Schule/Kita wird genutzt?','communityMeal',c.communityMeal)+clTri('Kostenpflichtige Schülerbeförderung ist notwendig?','schoolTransportNeeded',c.schoolTransportNeeded)+clTri('Zusätzliche Lernförderung/Nachhilfe ist erforderlich?','learningSupportNeeded',c.learningSupportNeeded)+clTri('Kosten für Sportverein, Musikschule oder ähnliche Teilhabe?','socialParticipationCosts',c.socialParticipationCosts)+clTri('Bezahlte Kinderbetreuungskosten vorhanden?','paidChildcareCosts',c.paidChildcareCosts))}
    ${claimGroup('claim-education','Ausbildung & Studium','BAB, BAföG und zusätzliche Förderungen',clSelect('Status','educationStatus',c.educationStatus,['|Bitte auswählen','none|keine Ausbildung/Studium','school|Schule / schulische Ausbildung','vocational|betriebliche/berufliche Ausbildung','study|Studium','volunteer|Freiwilligendienst','searching|Ausbildungsplatz suchend'])+clTri('Ausbildung/Studium in Vollzeit?','educationFullTime',c.educationFullTime)+clSelect('Bei Ausbildung: Art','trainingType',c.trainingType,['|Bitte auswählen','dual|betrieblich / dual','school|schulisch','other|sonstige'])+clTri('Wohnt die Person bei den Eltern?','livingWithParents',c.livingWithParents)+clTri('Erste Berufsausbildung?','firstVocationalTraining',c.firstVocationalTraining)+clTri('Reichen Ausbildungsvergütung/eigene Mittel voraussichtlich nicht?','educationIncomeTight',c.educationIncomeTight)+clTri('BAföG wird aktuell bezogen?','receivesBafoeg',c.receivesBafoeg)+clTri('BAB wird aktuell bezogen?','receivesBab',c.receivesBab)+clTri('Ausbildungsort so weit entfernt, dass ein Umzug erforderlich ist?','trainingFarAwayRequiresMove',c.trainingFarAwayRequiresMove))}
    ${claimGroup('claim-health','Gesundheit & Krankenversicherung','Krankengeld, Zuzahlungen und weitere Kassenleistungen',clSelect('Krankenversicherung','healthInsuranceType',c.healthInsuranceType,['|Bitte auswählen','statutory|gesetzlich mit eigenem Anspruch','family|gesetzlich familienversichert','private|privat','other|sonstige'])+clTri('Länger als 6 Wochen arbeitsunfähig?','longSick6Weeks',c.longSick6Weeks)+clTri('Aktuell: krankes Kind muss betreut werden und dadurch fällt Arbeit aus?','childCareIllNow',c.childCareIllNow)+clTri('Betroffenes Kind gesetzlich krankenversichert?','childStatutoryHealth',c.childStatutoryHealth)+clTri('Betroffenes Kind unter 12 oder behindert und auf Hilfe angewiesen?','childUnder12OrDisabled',c.childUnder12OrDisabled)+clTri('Hohe gesetzliche Zuzahlungen im laufenden Jahr?','gkvCopaysHigh',c.gkvCopaysHigh)+clTri('Schwerwiegend chronisch krank im Sinne der Krankenkasse?','severeChronic',c.severeChronic)+clTri('Haushalt kann wegen Krankheit/Behandlung/Reha nicht weitergeführt werden?','householdHelpNeeded',c.householdHelpNeeded)+clTri('Zahnersatz ist geplant oder bereits beantragt?','dentalTreatmentPlanned',c.dentalTreatmentPlanned))}
    ${claimGroup('claim-care','Pflege & Leistungsvermögen','Pflegegrad, Angehörigenpflege und Schwerbehinderung',clSelect('Pflegegrad','careGrade',c.careGrade,['|Bitte auswählen','0|kein Pflegegrad','1|Pflegegrad 1','2|Pflegegrad 2','3|Pflegegrad 3','4|Pflegegrad 4','5|Pflegegrad 5'])+clTri('Pflege erfolgt überwiegend zu Hause?','homeCare',c.homeCare)+clSelect('Tägliches Leistungsvermögen für Arbeit','workCapacity',c.workCapacity,['|Bitte auswählen','3plus|mindestens 3 Stunden täglich','under3|unter 3 Stunden täglich','unknown|unklar'])+clTri('Dauerhaft voll erwerbsgemindert festgestellt?','permanentFullReduction',c.permanentFullReduction)+clTri('Akute Pflegesituation eines nahen Angehörigen muss organisiert werden?','caresForRelativeAcute',c.caresForRelativeAcute)+clTri('Andere Person wird persönlich und unentgeltlich gepflegt?','caresForRelativeUnpaid',c.caresForRelativeUnpaid)+clSelect('Pflegegrad dieser gepflegten Person','careRecipientGrade',c.careRecipientGrade,['|Bitte auswählen','0|kein Pflegegrad','1|Pflegegrad 1','2|Pflegegrad 2','3|Pflegegrad 3','4|Pflegegrad 4','5|Pflegegrad 5'])+clField('Festgestellter Grad der Behinderung (GdB)','disabilityDegree',c.disabilityDegree,'number')+clSelect('Merkzeichen im Schwerbehindertenausweis','disabilityMarker',c.disabilityMarker,['|Bitte auswählen','none|keine','G|G','aG|aG','H|H','Bl|Bl','Gl|Gl','RF|RF','other|anderes']))}
    ${claimGroup('claim-pension','Rente & Hinterbliebene','Versicherungszeiten und Todesfälle',clTri('Allgemeine Renten-Wartezeit von 5 Jahren erfüllt?','pension5Years',c.pension5Years)+clTri('In den letzten 5 Jahren vor Erwerbsminderung mindestens 3 Jahre Pflichtbeiträge?','pension3of5',c.pension3of5)+clTri('Ehe-/Lebenspartnerperson verstorben?','spouseDeceased',c.spouseDeceased)+clTri('Zum Todeszeitpunkt verheiratet / Lebenspartnerschaft bestand?','marriedAtDeath',c.marriedAtDeath)+clTri('Ehe/Lebenspartnerschaft bestand mindestens ein Jahr?','marriageOneYear',c.marriageOneYear)+clTri('Verstorbene Person hatte 5 Jahre Wartezeit erfüllt oder bezog bereits Rente?','deceasedPensionEligible',c.deceasedPensionEligible)+clTri('Nach dem Todesfall erneut geheiratet / Lebenspartnerschaft begründet?','remarriedAfterDeath',c.remarriedAfterDeath)+clTri('Elternteil verstorben?','parentDeceased',c.parentDeceased)+clTri('Verstorbener Elternteil hatte 5 Jahre Wartezeit erfüllt oder bezog bereits Rente?','deceasedParentPensionEligible',c.deceasedParentPensionEligible)+clTri('Bei 18–26 Jahren: Schule/Ausbildung/Studium/Freiwilligendienst?','orphanEligibleActivity',c.orphanEligibleActivity))}
    <button class="cta teal full mt16" onclick="saveClaimProfile()">Prüfdaten speichern & neu auswerten</button>
    <div class="notice mt16"><b>Wichtig:</b> Das ist eine Vorauswahl, keine verbindliche Rechts- oder Bewilligungsentscheidung. Einkommensgrenzen, Freibeträge, Haushaltskonstellationen, Aufenthaltsrecht und Sonderfälle können das Ergebnis verändern. Offizielle Quelle und Regelstand stehen bei jeder Leistung.</div>
  </div></section>`;
}

async function saveClaimProfile(){
  const p=activePerson();if(!p)return;normalizePerson(p);p.claimProfile=p.claimProfile||{};
  for(const k of CLAIM_FIELDS){const el=document.getElementById('cl_'+k);if(el)p.claimProfile[k]=(el.value||'').trim()}
  p.claimProfile.updatedAt=new Date().toISOString();
  await persistPersons();toast('Anspruchscheck aktualisiert');render();
}

function openClaimGroup(id){const d=document.getElementById(id);if(!d)return;d.open=true;setTimeout(()=>d.scrollIntoView({behavior:'smooth',block:'start'}),20)}
