import React, { useState, useEffect } from "react";
import "../css/files-list.scss";
import {series} from "../data";

function AccordeonGroupItem({items}) {
  const [itemChecked, setItemChecked] = useState(items.watch);
  
  return(
    <div className="files-accordeon__group-item">
      <div className={`files-accordeon__checkbox ${itemChecked ? "checked" : ""}`} onClick={()=>setItemChecked(!itemChecked)} />
      <div className="files-accordeon__group-item-title" onClick={()=>setItemChecked(!itemChecked)}>{items.title}</div>
      <div className="files-accordeon__group-item-size">10 Mb</div>
    </div>
  )
}

function AccordeonGroup({items}) {
  const [groupOpen, setGroupOpen] = useState(false);
  const [groupChecked, setGroupChecked] = useState(false);

  const seriesList = items.series.map(function(item, index) {
    return <AccordeonGroupItem items={item} key={index} />;
  }); 

  const handleGroupClick = (e) => {
    setGroupChecked(!groupChecked);
    e.stopPropagation();
  }

  const watchedSeries = items.series.filter(item => item.watch === true);

  useEffect(()=>{
    if(watchedSeries.length === items.series.length) setGroupChecked(true);
  },[items]);

  return (
    <div className="files-accordeon__group">
      <div className={`files-accordeon__group-header ${ groupChecked ? "checked" : "" } ${ groupOpen ? "open" : "" }`} 
        onClick={()=>setGroupOpen(!groupOpen)}>
        <div className={`files-accordeon__checkbox ${ groupChecked ? "checked" : "" }`} 
          onClick={handleGroupClick} />
        <div className="files-accordeon__group-header-title">{items.title}</div>
        <div className="files-accordeon__group-header-size">123 Mb</div>
      </div>
      <div className={`files-accordeon__group-list ${groupOpen ? "open" : ""}`}>        
        {seriesList}
      </div>
    </div>
  );
}

function FilesAccordeon() {
  const seasonsList = series.map(function(group, index) {
    return <AccordeonGroup items={group} key={index} />;
  }); 
  return (
    <div className="files-accordeon">
      {seasonsList}
    </div>
  );
}

function FilesList() {
  const [sortDesc, setSortDesc] = useState(true);
  return (
    <div className="files-list">
      <div className="files-list__header">
        <div className="files-list__title">Файлы:</div>
        <button className={`files-list__sort ${sortDesc ? "desc" : "asc" }`} onClick={()=>setSortDesc(!sortDesc)} />
      </div>
      <FilesAccordeon />
    </div>
  );
}

export default FilesList;
