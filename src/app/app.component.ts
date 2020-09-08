import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'active'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'active'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'active'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'active'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'active'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'active'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: 'active'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: 'active'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: 'active'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: 'active'},
    {position: 11, name: 'Boron', weight: 20.2809, symbol: 'Br', status: 'active'}
    ];

  title = 'test-table';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'action',];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortedData: PeriodicElement[] = this.ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(this.sortedData);

  constructor(){
    this.sortedData = this.dataSource.data.slice();
    this.addMoreData();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    console.log(sort);
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.ELEMENT_DATA;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.sortedData.slice());
      this.dataSource.paginator = this.paginator;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.sortedData.slice());
    this.dataSource.paginator = this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangeStatus(el: PeriodicElement) {
    const isActive = el.status === 'active';
    if (isActive){
      el.status = 'inactive';
    } else {
      el.status = 'active';
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMoreData() {
    setTimeout( () => {
      this.ELEMENT_DATA.push({
        name: 'Prince',
        position: 0,
        weight: 50.900,
        symbol: 'P',
        status: 'active'
      });
      this.sortedData = this.ELEMENT_DATA;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.sortedData.slice());
      this.dataSource.paginator = this.paginator;
    }, 4000);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}


