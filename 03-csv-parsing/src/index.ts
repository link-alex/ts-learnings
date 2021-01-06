import { MatchReader } from './MatchReader';

// analyzing
import { WinsAnalyzer } from './analyzers/WinsAnalyzer';
import { ConsoleReport } from './reportTargets/ConsoleReport';
import { Summary } from './Summary';

const reader = MatchReader.fromCsv('football.csv');
reader.load();

const summary = new Summary(new WinsAnalyzer('Man United'), new ConsoleReport());
summary.buildAndPrintReport(reader.matches);

const htmlSummary = Summary.winsAnalysisWithHtmlReport('Man United');
htmlSummary.buildAndPrintReport(reader.matches);
