import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MesageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpclientService } from '../httpclient.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent{

  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpclientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialogService: DialogService) {
      super(spinner)
  }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry)
        .file((_file: File) => {
          fileData.append("Files", _file, file.relativePath)
        });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState,
      afterClosed: () => {
        this.showSpinner(SpinnerType.BallAtom);
        
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          this.hideSpinner(SpinnerType.BallAtom);

          const message: string = "Dosyalar başarıyla yüklenmiştir.";

          if (this.options.isAdminPage) {

            this.alertifyService.message(message, {
              messageType: MesageType.Success,
              dismisOthers: true,
              position: Position.TopRight
            })

          } else {

            this.customToastrService.message(message, "Başarılı!", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })

          }

        }, (errorResponse: HttpErrorResponse) => {

          this.hideSpinner(SpinnerType.BallAtom);

          const message: string = "Dosyalar yüklenirken bir hatayla karşılaşıldı.";

          if (this.options.isAdminPage) {

            this.alertifyService.message(message, {
              messageType: MesageType.Error,
              dismisOthers: true,
              position: Position.TopRight
            })

          } else {

            this.customToastrService.message(message, "Başarısız!", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })

          }
        });
      }
    })
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = true;
}