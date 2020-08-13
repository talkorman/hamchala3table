import { Component, OnInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import {Item} from 'src/interfaces/item';
import { ItemsList } from '../items.service';
import { Element, DomElementSchemaRegistry } from '@angular/compiler';
import { addListener } from 'process';
declare var $: any;


@Component({
  selector: '',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{   
    items : Item[]; // = [new Item(null,null,null,null,null,null,null,null,null,null)];
    rows: Number = 0;
    total_cbm:Number;
    clone:HTMLElement;
    nextNode = 0;     //for adding elements id's fitting the array cells.
    rowIndex: Number = 0;
    proprtiesOfItem: String[] = ['i_num', 'name', 'pallet', 'stack', 'qty', 'length', 'width', 'height', 'weight', 'cbm'];
constructor(public itemsList: ItemsList) {}; //creating a property inside the class.
  ngOnInit(){
    this.items = this.itemsList.getItems();
  }
  
  addLine(event):void{
          this.items.push(new Item(null,null,null,null,null,null,null,null,null,null));
          this.itemsList.addItem(new Item(null,null,null,null,null,null,null,null,null,null));
/*    const nodeLine: HTMLElement = event.target.parentElement, //the node of one table line
          clone = nodeLine.cloneNode(true);
          this.rowIndex = $(nodeLine).first().val();
          $(clone).insertAfter($(nodeLine));
          let nodeId = 'cloned'+this.nextNode;
          $(nodeLine).next().children()[10].id = nodeId;
          document.getElementById(nodeId).addEventListener('click', (e)=>{this.addLine(e)});
          document.getElementById(nodeId).nextSibling.addEventListener('click', (e)=>{this.decLine(e)});     
          for(let i = 1; i < 10; i++){    //clearing the new line and adding blur events
           let node = document.getElementById(nodeId).parentNode.children[i].firstChild;
           $(node).val(''); 
           node.addEventListener('blur', (e)=>this.modifyArrayCells(e));
          }
          this.nextNode++;*/
          this.numbering();
          this.modifyArrayCells(0);
  }

  decLine(event):void{
    if(this.items.length > 1){this.items.pop()};    
    const nodeLine: HTMLElement = event.target.parentElement;
          if(nodeLine.parentNode.childNodes.length < 2){
            return;
          }
          $(nodeLine).remove();
          this.numbering();
          this.modifyArrayCells(0);
  }

  numbering():void{
    const rows = document.querySelector('tbody').children,
          rowsArr:HTMLElement[] = Array.prototype.slice.call(rows);
          for(let i = 0; i < rowsArr.length; i++){
           rowsArr[i].querySelector('th').firstChild.firstChild.textContent = Number(i + 1).toString();
          }
  }

  modifyArrayCells(e):void{
    const rows:number = $('tbody').children().length;
   for(let i = 0; i < rows; i++){
     for(let j=0; j < 8; j++){
       let prop: number|String = this.proprtiesOfItem[j];
        let data:String|number = j > 0 && j < 9 ? $('tbody tr')[i].querySelector('.'+prop+' input').value: $('tbody tr')[i].querySelector('.'+prop+' p').innerHTML;
        
        this.items[i][''+prop] = data;
     } 
   }
  // Repository.setData(this.items);
  }
}
