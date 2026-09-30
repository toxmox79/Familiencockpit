/* Familiencockpit v0.14 – progressive Anspruchsprüfung
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
  waisen:'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/In-der-Rente/Hinterbliebenenrente'
};

const CLAIM_FIELDS=[
  'householdSize','housingType','housingCost',
  'incomeSituation','householdNetIncome','assetsBand','receivesKiz','receivesWohngeld','receivesGrundsicherung','receivesSocialAssistance','currentBenefit',
  'employmentStatus','weeklyHours','unemployedRegistered','insuranceMonths30',
  'childrenInHousehold','childUnder18','child18to24Eligible','receivesChildBenefit','singleParent','maintenanceStatus','pregnant','youngestChildBirthDate','childCareSelf','taxableIncomeOver175k',
  'educationStatus','educationFullTime','trainingType','livingWithParents','firstVocationalTraining','educationIncomeTight',
  'healthInsuranceType','longSick6Weeks','childCareIllNow','childStatutoryHealth','childUnder12OrDisabled',
  'careGrade','homeCare','workCapacity','permanentFullReduction',
  'pension5Years','pension3of5','spouseDeceased','marriedAtDeath','marriageOneYear','deceasedPensionEligible','remarriedAfterDeath','parentDeceased','deceasedParentPensionEligible','orphanEligibleActivity'
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

  // Kindergeld
  if(child===true) out.push(claimResult('kindergeld','Kindergeld','👶','Familie','likely','Mindestens ein Kind ist als alters-/ausbildungsbedingt grundsätzlich relevant hinterlegt.',[],'kindergeld'));
  else if(child===false) out.push(claimResult('kindergeld','Kindergeld','👶','Familie','none','Derzeit ist kein Kind unter 18 bzw. kein relevanter Status zwischen 18 und 24 hinterlegt.',[],'kindergeld'));
  else out.push(claimResult('kindergeld','Kindergeld','👶','Familie','check','Das Alter bzw. der Ausbildungsstatus der Kinder ist noch nicht vollständig geklärt.',need(p,[['childUnder18','Kind unter 18?'],['child18to24Eligible','Kind 18–24 in Ausbildung/Studium/Freiwilligendienst o. ä.?']]),'kindergeld'));

  // Kinderzuschlag
  if(claimNo(p,'receivesChildBenefit')) out.push(claimResult('kiz','Kinderzuschlag','🧒','Familie','none','Kinderzuschlag setzt grundsätzlich einen Kindergeldanspruch voraus.',[],'kiz'));
  else if(child===true && claimYes(p,'receivesChildBenefit') && incomeTight(p) && !currentGS) out.push(claimResult('kiz','Kinderzuschlag','🧒','Familie','check','Kindergeld, Kind im Haushalt und knappes Familieneinkommen sprechen für eine genaue KiZ-Prüfung. Die Höhe ist komplex und wird hier nicht berechnet.',[],'kiz'));
  else out.push(claimResult('kiz','Kinderzuschlag','🧒','Familie','check','Für eine belastbare Vorauswahl fehlen noch Angaben zu Kindergeld, Kindern oder Einkommenssituation.',need(p,[['receivesChildBenefit','Kindergeldanspruch/-bezug'],['childUnder18','Kind unter 18?'],['incomeSituation','Reicht das Haushaltseinkommen?']]),'kiz'));

  // Bildung und Teilhabe
  if((currentKiz||currentWohngeld||currentGS) && child===true) out.push(claimResult('but','Bildung & Teilhabe','🎒','Familie','likely','Im Haushalt ist Kinderzuschlag, Wohngeld oder Grundsicherungsgeld hinterlegt; damit sollten Leistungen für Bildung und Teilhabe für Kinder mitgeprüft werden.',[],'but'));
  else out.push(claimResult('but','Bildung & Teilhabe','🎒','Familie','check','Die Leistung hängt insbesondere von einer passenden Grundleistung und einem Kind/Jugendlichen im Haushalt ab.',need(p,[['receivesKiz','Kinderzuschlag bezogen?'],['receivesWohngeld','Wohngeld bezogen?'],['receivesGrundsicherung','Grundsicherungsgeld bezogen?'],['childUnder18','Kind/Jugendlicher im Haushalt']]),'but'));

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

  // Wohngeld
  if(currentGS) out.push(claimResult('wohngeld','Wohngeld','🏠','Wohnen','none','Grundsicherungsgeld ist als aktuelle Leistung hinterlegt; Wohngeld ist dann regelmäßig nicht die parallele Standardleistung.',[],'wohngeld'));
  else if(['rent','own'].includes(claimVal(p,'housingType')) && incomeTight(p)) out.push(claimResult('wohngeld','Wohngeld','🏠','Wohnen','check','Wohnkosten und knappes Einkommen sprechen für eine Wohngeldprüfung. Die tatsächliche Höhe hängt u. a. von Haushaltsgröße, Einkommen, Miete/Belastung und Mietenstufe ab.',need(p,[['householdSize','Haushaltsgröße'],['housingCost','Bruttokaltmiete/Belastung']]),'wohngeld'));
  else out.push(claimResult('wohngeld','Wohngeld','🏠','Wohnen','check','Für die Vorauswahl braucht die App Wohnform, Haushaltsgröße, Wohnkosten und Einkommenssituation.',need(p,[['housingType','Miete oder Eigentum?'],['householdSize','Haushaltsgröße'],['housingCost','Bruttokaltmiete/Belastung'],['incomeSituation','Einkommenssituation']]),'wohngeld'));

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

  // Erwerbsminderungsrente
  if((claimVal(p,'workCapacity')==='under3'||claimYes(p,'permanentFullReduction')) && claimYes(p,'pension5Years') && claimYes(p,'pension3of5')) out.push(claimResult('em','Erwerbsminderungsrente','♿','Rente','check','Stark eingeschränkte Erwerbsfähigkeit sowie die typischen Versicherungszeiten sind hinterlegt. Die medizinische und versicherungsrechtliche Prüfung erfolgt durch die Rentenversicherung.',[],'em'));
  else out.push(claimResult('em','Erwerbsminderungsrente','♿','Rente','check','Für die Vorauswahl sind Leistungsvermögen und rentenrechtliche Versicherungszeiten entscheidend.',need(p,[['workCapacity','Tägliches Leistungsvermögen'],['pension5Years','Allgemeine Wartezeit von 5 Jahren erfüllt?'],['pension3of5','3 Jahre Pflichtbeiträge in den letzten 5 Jahren?']]),'em'));

  // Grundsicherung Alter / volle EM
  if(incomeInsufficient(p) && (p.life?.pensioner==='yes'||claimYes(p,'permanentFullReduction'))) out.push(claimResult('grundsicherungAlter','Grundsicherung im Alter / bei Erwerbsminderung','🧓','Rente','check','Nicht ausreichendes Einkommen und Rentenbezug bzw. dauerhafte volle Erwerbsminderung sind hinterlegt. Zuständigkeit und Bedarfsberechnung müssen geprüft werden.',[],'grundsicherungAlter'));
  else out.push(claimResult('grundsicherungAlter','Grundsicherung im Alter / bei Erwerbsminderung','🧓','Rente','check','Relevant ist insbesondere Bedürftigkeit zusammen mit Regelaltersgrenze oder dauerhafter voller Erwerbsminderung.',need(p,[['incomeSituation','Reicht das Einkommen?'],['permanentFullReduction','Dauerhaft voll erwerbsgemindert?']]),'grundsicherungAlter'));

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
  return a.slice(0,3);
}

function claimStatusLabel(s){return s==='likely'?'wahrscheinlich relevant':s==='check'?'prüfen':'derzeit kein Hinweis'}
function claimCard(r){
  const miss=r.missing?.filter(Boolean)||[];
  return `<article class="claim-card ${r.status}"><div class="claim-head"><div class="claim-icon">${r.icon}</div><div class="grow"><small>${esc(r.category)}</small><h3>${esc(r.title)}</h3></div><span class="claim-status ${r.status}">${esc(claimStatusLabel(r.status))}</span></div><p>${esc(r.reason)}</p>${miss.length?`<div class="claim-missing"><b>Noch hilfreich:</b> ${miss.slice(0,3).map(esc).join(' · ')}${miss.length>3?` · +${miss.length-3}`:''}</div>`:''}<div class="claim-actions"><a href="${esc(r.source)}" target="_blank" rel="noopener">Offizielle Quelle ↗</a><small>Regelstand ${esc(r.verified)}</small></div></article>`
}

function claimGroup(id,title,desc,inner,open=false){return `<details class="claim-group" id="${id}" ${open?'open':''}><summary><span><b>${esc(title)}</b><small>${esc(desc)}</small></span><strong>＋</strong></summary><div class="claim-group-body">${inner}</div></details>`}
function clTri(label,key,val0='unknown',hint=''){return triSelect(label,'cl_'+key,val0||'unknown',hint)}
function clSelect(label,key,val0,opts){return selectField(label,'cl_'+key,val0||'',opts)}
function clField(label,key,val0='',type='text',hint=''){return field(label,'cl_'+key,val0||'',type,hint)}

function claimsScreen(){
  const p=activePerson();if(!p)return noPerson('Ansprüche & Leistungen');normalizePerson(p);p.claimProfile=p.claimProfile||{};const c={...p.claimProfile};if(!c.employmentStatus)c.employmentStatus=claimVal(p,'employmentStatus');if(!c.pension5Years)c.pension5Years=claimVal(p,'pension5Years');
  const results=evaluateClaims(p),likely=results.filter(x=>x.status==='likely'),check=results.filter(x=>x.status==='check'),none=results.filter(x=>x.status==='none'),pct=claimCheckability(p),suggest=claimSuggestions(p);
  const baseMissing=[];if(!p.profile?.zip)baseMissing.push('PLZ');if(!p.profile?.maritalStatus)baseMissing.push('Familienstand');
  const baseCard=baseMissing.length?`<div class="notice compact"><b>Basisdaten fehlen:</b> ${esc(baseMissing.join(', '))}. Diese kannst du unter Stammdaten ergänzen. <button class="inline-link" onclick="go('profile')">Stammdaten öffnen</button></div>`:'';
  return `<section class="screen">${appTop('Ansprüche & Leistungen',`Für ${personName(p)}`)}<div class="content">${personSwitch(p)}
    <div class="claim-hero"><div class="claim-meter"><b>${pct}%</b><span>prüfbar</span></div><div class="grow"><h2>${likely.length} wahrscheinlich relevante ${likely.length===1?'Leistung':'Leistungen'}</h2><p>Die App sammelt nur so viele Zusatzangaben, wie für eine sinnvolle Vorauswahl nötig sind.</p></div></div>
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
    <div class="section-title"><h2>Gefundene Ansprüche</h2><span>19 Leistungen im Regelwerk</span></div>
    ${likely.length?`<div class="claim-results">${likely.map(claimCard).join('')}</div>`:`<div class="empty-card compact-empty"><div class="empty-icon">🎯</div><h3>Noch kein eindeutiger Treffer</h3><p>Das ist normal, solange nur wenige optionale Angaben hinterlegt sind.</p></div>`}
    ${check.length?`<details class="claim-none claim-check-list"><summary>${check.length} weitere mögliche Ansprüche prüfen</summary><div class="claim-results mt10">${check.map(claimCard).join('')}</div></details>`:''}
    ${none.length?`<details class="claim-none"><summary>${none.length} derzeit nicht passende Hinweise anzeigen</summary><div class="claim-results mt10">${none.map(claimCard).join('')}</div></details>`:''}
    <div class="section-title"><h2>Optionale Prüfdaten</h2><span>nur bei Bedarf öffnen</span></div>
    ${claimGroup('claim-household','Haushalt & Wohnen','Haushaltsgröße, Miete/Eigentum',clField('Personen im Haushalt','householdSize',c.householdSize,'number')+clSelect('Wohnform','housingType',c.housingType,['|Bitte auswählen','rent|Miete','own|Eigentum','other|Sonstiges'])+clField('Bruttokaltmiete / monatliche Belastung in €','housingCost',c.housingCost,'number','Für die Vorauswahl reicht ein ungefährer aktueller Wert.'))}
    ${claimGroup('claim-income','Einkommen & Vermögen','nur grob für die Vorauswahl',clSelect('Reicht das Haushaltseinkommen für den Lebensunterhalt?','incomeSituation',c.incomeSituation,['|Bitte auswählen','enough|Ja, ausreichend','tight|Knapp, aber grundsätzlich ausreichend','notEnough|Nein, reicht nicht'])+clField('Haushalts-Nettoeinkommen grob pro Monat in €','householdNetIncome',c.householdNetIncome,'number','Optional. Noch keine verbindliche Leistungsberechnung.')+clSelect('Verwertbares Vermögen grob','assetsBand',c.assetsBand,['|Bitte auswählen','under10|unter 10.000 €','10to50|10.000–50.000 €','50to100|50.000–100.000 €','over100|über 100.000 €','unknown|weiß ich nicht'])+clTri('Kinderzuschlag wird aktuell bezogen?','receivesKiz',c.receivesKiz)+clTri('Wohngeld wird aktuell bezogen?','receivesWohngeld',c.receivesWohngeld)+clTri('Grundsicherungsgeld (Jobcenter) wird aktuell bezogen?','receivesGrundsicherung',c.receivesGrundsicherung)+clTri('Sozialhilfe / Grundsicherung im Alter wird aktuell bezogen?','receivesSocialAssistance',c.receivesSocialAssistance))}
    ${claimGroup('claim-work','Arbeit','Beschäftigung und Versicherungszeiten',clSelect('Aktueller Status','employmentStatus',c.employmentStatus,['|Bitte auswählen','employed|angestellt','selfemployed|selbstständig','unemployed|arbeitslos','student|Studium','vocational|Ausbildung','school|Schule','pensioner|Rente','notworking|nicht erwerbstätig'])+clField('Wochenarbeitszeit','weeklyHours',c.weeklyHours,'number')+clTri('Bei Arbeitslosigkeit: arbeitslos gemeldet?','unemployedRegistered',c.unemployedRegistered)+clSelect('Versicherungszeiten Arbeitslosenversicherung in den letzten 30 Monaten','insuranceMonths30',c.insuranceMonths30,['|Bitte auswählen','under6|unter 6 Monate','6to11|6–11 Monate','12plus|mindestens 12 Monate','unknown|weiß ich nicht']))}
    ${claimGroup('claim-family','Kinder & Familie','Kindergeld, KiZ, Elterngeld, Unterhalt',clField('Kinder im Haushalt','childrenInHousehold',c.childrenInHousehold,'number')+clTri('Mindestens ein Kind unter 18?','childUnder18',c.childUnder18)+clTri('Mindestens ein Kind 18–24 in Schule/Ausbildung/Studium/Freiwilligendienst?','child18to24Eligible',c.child18to24Eligible)+clTri('Kindergeld wird bezogen / Anspruch besteht?','receivesChildBenefit',c.receivesChildBenefit)+clTri('Alleinerziehend?','singleParent',c.singleParent)+clSelect('Unterhalt des anderen Elternteils','maintenanceStatus',c.maintenanceStatus,['|Bitte auswählen','regular|regelmäßig / ausreichend','partial|teilweise / unregelmäßig','none|gar nicht','unknown|weiß ich nicht'])+clTri('Schwangerschaft?','pregnant',c.pregnant)+clField('Geburtsdatum jüngstes Kind','youngestChildBirthDate',c.youngestChildBirthDate,'date')+clTri('Jüngstes Kind wird selbst betreut und lebt im gemeinsamen Haushalt?','childCareSelf',c.childCareSelf)+clTri('Zu versteuerndes Jahreseinkommen über 175.000 €?','taxableIncomeOver175k',c.taxableIncomeOver175k,'Nur für die grobe Elterngeld-Vorauswahl.'))}
    ${claimGroup('claim-education','Ausbildung & Studium','BAB, BAföG und Kindergeld ab 18',clSelect('Status','educationStatus',c.educationStatus,['|Bitte auswählen','none|keine Ausbildung/Studium','school|Schule / schulische Ausbildung','vocational|betriebliche/berufliche Ausbildung','study|Studium','volunteer|Freiwilligendienst','searching|Ausbildungsplatz suchend'])+clTri('Ausbildung/Studium in Vollzeit?','educationFullTime',c.educationFullTime)+clSelect('Bei Ausbildung: Art','trainingType',c.trainingType,['|Bitte auswählen','dual|betrieblich / dual','school|schulisch','other|sonstige'])+clTri('Wohnt die Person bei den Eltern?','livingWithParents',c.livingWithParents)+clTri('Erste Berufsausbildung?','firstVocationalTraining',c.firstVocationalTraining)+clTri('Reichen Ausbildungsvergütung/eigene Mittel voraussichtlich nicht?','educationIncomeTight',c.educationIncomeTight))}
    ${claimGroup('claim-health','Gesundheit & Krankenversicherung','Krankengeld und Kinderkrankengeld',clSelect('Krankenversicherung','healthInsuranceType',c.healthInsuranceType,['|Bitte auswählen','statutory|gesetzlich mit eigenem Anspruch','family|gesetzlich familienversichert','private|privat','other|sonstige'])+clTri('Länger als 6 Wochen arbeitsunfähig?','longSick6Weeks',c.longSick6Weeks)+clTri('Aktuell: krankes Kind muss betreut werden und dadurch fällt Arbeit aus?','childCareIllNow',c.childCareIllNow)+clTri('Betroffenes Kind gesetzlich krankenversichert?','childStatutoryHealth',c.childStatutoryHealth)+clTri('Betroffenes Kind unter 12 oder behindert und auf Hilfe angewiesen?','childUnder12OrDisabled',c.childUnder12OrDisabled))}
    ${claimGroup('claim-care','Pflege & Leistungsvermögen','Pflegegrad und tägliche Arbeitsfähigkeit',clSelect('Pflegegrad','careGrade',c.careGrade,['|Bitte auswählen','0|kein Pflegegrad','1|Pflegegrad 1','2|Pflegegrad 2','3|Pflegegrad 3','4|Pflegegrad 4','5|Pflegegrad 5'])+clTri('Pflege erfolgt überwiegend zu Hause?','homeCare',c.homeCare)+clSelect('Tägliches Leistungsvermögen für Arbeit','workCapacity',c.workCapacity,['|Bitte auswählen','3plus|mindestens 3 Stunden täglich','under3|unter 3 Stunden täglich','unknown|unklar'])+clTri('Dauerhaft voll erwerbsgemindert festgestellt?','permanentFullReduction',c.permanentFullReduction))}
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
