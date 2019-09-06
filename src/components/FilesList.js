import React, { useState, useEffect } from "react";
import "../css/files-list.scss";

function AccordeonGroupItem({ id, item, addCheckedTorrents }) {
  const [itemChecked, setItemChecked] = useState(item.checked);

  const handleClick = () => {
    setItemChecked(!itemChecked);
  };

  useEffect(() => {
    addCheckedTorrents(id, itemChecked);
  }, [itemChecked]);

  return (
    <div className="files-accordeon__group-item">
      <div
        className={`files-accordeon__checkbox ${itemChecked ? "checked" : ""}`}
        onClick={handleClick}
      />
      <div className="files-accordeon__group-item-title" onClick={handleClick}>
        {item.title}
      </div>
      <div className="files-accordeon__group-item-size">{item.size}</div>
    </div>
  );
}

/*function AccordeonGroup({ items }) {
  const [groupOpen, setGroupOpen] = useState(false);
  const [groupChecked, setGroupChecked] = useState(false);

  const seriesList = items.series.map(function(item, index) {
    return <AccordeonGroupItem items={item} key={index} />;
  });

  const handleGroupClick = e => {
    setGroupChecked(!groupChecked);
    e.stopPropagation();
  };

  const watchedSeries = items.series.filter(item => item.watch === true);

  useEffect(() => {
    if (watchedSeries.length === items.series.length) setGroupChecked(true);
  }, [items]);

  return (
    <div className="files-accordeon__group">
      <div
        className={`files-accordeon__group-header ${
          groupChecked ? "checked" : ""
        } ${groupOpen ? "open" : ""}`}
        onClick={() => setGroupOpen(!groupOpen)}
      >
        <div
          className={`files-accordeon__checkbox ${
            groupChecked ? "checked" : ""
          }`}
          onClick={handleGroupClick}
        />
        <div className="files-accordeon__group-header-title">{items.title}</div>
        <div className="files-accordeon__group-header-size">123 Mb</div>
      </div>
      <div className={`files-accordeon__group-list ${groupOpen ? "open" : ""}`}>
        {seriesList}
      </div>
    </div>
  );
}*/

function FilesAccordeon({ data, addTorrents }) {
  for (let i in data) {
    data[i].checked = true;
  }
  const [torrentList, setTorrentList] = useState(data);

  const addCheckedTorrents = (id, itemChecked) => {
    torrentList[id].checked = itemChecked;
    setTorrentList(torrentList);
    addTorrents(torrentList);
  };

  const seasonsList = data.map(function(group, index) {
    return (
      <AccordeonGroupItem
        id={index}
        item={group}
        key={index}
        checked={group.checked}
        addCheckedTorrents={addCheckedTorrents}
      />
    );
  });

  return <div className="files-accordeon">{seasonsList}</div>;
}

function FilesList({ data, addTorrents }) {
  //const [sortDesc, setSortDesc] = useState(true);
  return (
    <div className="files-list">
      <div className="files-list__header">
        <div className="files-list__title">Файлы:</div>
        {/* <button className={`files-list__sort ${sortDesc ? "desc" : "asc" }`} onClick={()=>setSortDesc(!sortDesc)} /> */}
      </div>
      <FilesAccordeon data={data} addTorrents={addTorrents} />
    </div>
  );
}

export default FilesList;
