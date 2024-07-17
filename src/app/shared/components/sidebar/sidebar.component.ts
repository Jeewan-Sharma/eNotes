import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoaderService, NotesService } from '@core/services';

import { BadgeModule } from 'primeng/badge';

const PrimeNgModules = [BadgeModule]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [CommonModule, PrimeNgModules]
})
export class SidebarComponent implements OnInit {

  constructor(
    protected _notesService: NotesService,
    private _loaderService: LoaderService
  ) { };

  async ngOnInit() {
    this._notesService.getNotesTag()
  }

  get selectedTab$() {
    return this._notesService.selectedTab$;
  }

  get tags$() {
    return this._notesService.tags$;
  }


  async getAllNotes() {
    try {
      this.selectTab('All Notes');
      this._loaderService.showLoader()
      await this._notesService.getNotes();
    } catch (e) {
      throw e
    } finally {
      this._loaderService.hideLoader();
    }
  }

  async getImportantNotes() {
    try {
      this.selectTab('Important notes');
      this._loaderService.showLoader()
      await this._notesService.getImportantNotes();
    } catch (e) {
      throw e
    } finally {
      this._loaderService.hideLoader();
    }
  }

  async getNotesByTag(tag: string) {
    try {
      this.selectTab(tag);
      this._loaderService.showLoader()
      await this._notesService.getNotesByTag(tag);
    } catch (e) {
      throw e
    } finally {
      this._loaderService.hideLoader();
    }
  }

  selectTab(tab: string) {
    this._notesService.selectTab(tab)
  }

}
