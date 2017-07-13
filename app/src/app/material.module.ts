import { NgModule } from '@angular/core';
import {
    MdButtonModule,
    MdGridListModule,
    MdCardModule,
    MdCoreModule,
    MdInputModule,
    MdDialogModule,
    MdIconModule
} from '@angular/material';

const modules = [
    MdButtonModule,
    MdGridListModule,
    MdCardModule,
    MdCoreModule,
    MdInputModule,
    MdDialogModule,
    MdIconModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }
