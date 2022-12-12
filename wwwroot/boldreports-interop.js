// Interop file to render the Bold Report Viewer component with properties.
window.BoldReports = {
    RenderViewer: function (dotNetReference, elementID, reportViewerOptions, callback) {
        var completedCall = 0;
        $("#" + elementID).boldReportViewer({
            reportPath: reportViewerOptions.reportName,
            reportServiceUrl: reportViewerOptions.serviceURL,
            exportSettings: {
                exportOptions: ej.ReportViewer.ExportOptions.Excel | ej.ReportViewer.ExportOptions.Pdf,
                excelFormat: ej.ReportViewer.ExcelFormats.Excel2013
            },
            exportItemClick: function (args) {
                args.cancel = true;

                var proxy = $('#' + elementID).data('boldReportViewer');
                var Report = proxy.model.reportPath;
                var lastsIndex = Report.lastIndexOf("/");
                var reportName = Report.substring(lastsIndex + 1);

                var _json = {
                    exportType: args.value , reportViewerToken: proxy._reportViewerToken, ReportName: reportName
                };
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "http://localhost:5007/api/ReportViewer/Export",
                    data: JSON.stringify(_json),
                    crossDomain: true,
                    success: function (data) {
                        var link = document.createElement('a');
                        link.download = reportName;
                        if (args.value == "PDF") {

                            link.href = `data:application/pdf;base64,${data}`
                        } else {
                            link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data}`

                        }
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                })
            }         
        });
    },
    RenderDesigner: function (dotNetReference, elementID, reportDesignerOptions, callback) {
		$("#" + elementID).boldReportDesigner({
			serviceUrl: reportDesignerOptions.serviceURL,
			toolbarSettings: {
				items: ej.ReportDesigner.ToolbarItems.All & ~ej.ReportDesigner.ToolbarItems.Save
            }
		});
		
	}
}

window.Save = function (id) {
    var reportmodel = null;
    var designerObj = $("#" + id).data("boldReportDesigner");
    var JsonData = designerObj.saveReportDefinition((args) => {
        reportmodel = args.data;

        var link = document.createElement('a');
        link.download = "report1.rdl";

        var data = new Blob([reportmodel], { type: 'text/plain' });

        var url = window.URL.createObjectURL(data);

        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }, ej.ReportDesigner.DataFormat.XML);

}

window.DisposeReportsObject = () => {
    var reportViewerElement = document.querySelector('.e-reportviewer.e-js');
    if (reportViewerElement) {
        $(reportViewerElement).data('boldReportViewer').destroy(); //Destroy the report viewer processing objects.
    }
    return true;
}
