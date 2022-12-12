using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBoldReports.Data
{
    public class BoldReportViewerOptions
    {
        public string ReportName { get; set; }

        public string ServiceURL { get; set; }

        public List<BoldReportParameter> Parameters { get; set; }
    }

    // The default SerializerSettings of Balzor application uses camelCase serializer with an interaction of JavaScript interop.
    /// So, we don’t have need to define the property name with camelCase as like the JavaScript code snippets available in documentation.

    public class BoldReportParameter
    {
        public string Name { get; set; }

        public List<string> Values { get; set; }
    }
    public class BoldReportDesignerOptions
    {
        public string ServiceURL { get; set; }
    }
    public class BoldReportWriterExportOptions
    {
        public List<BoldReportParameter> Parameters { get; set; }
    }

    public class ExportOptions
    {
        public string Name { get; set; }
        public string Token { get; set; }
        public string ExportType { get; set; }
    }
}
