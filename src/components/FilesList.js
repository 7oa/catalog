import React, { useState, useEffect } from "react";
import CheckboxTree from "react-checkbox-tree";
import "../css/files-list.scss";
import "../css/checkbox-tree.scss";

function compareStrings(str1, str2) {
  const rx = /([^\d]+|\d+)/gi;
  const str1split = str1.title.match(rx);
  const str2split = str2.title.match(rx);
  for (
    let i = 0, l = Math.min(str1split.length, str2split.length);
    i < l;
    i++
  ) {
    let s1 = str1split[i],
      s2 = str2split[i];
    if (s1 === s2) continue;
    if (isNaN(+s1) || isNaN(+s2)) return s1 > s2 ? 1 : -1;
    else return +s1 - s2;
  }
  return 0;
}

function childrensCount(arr) {
  let sum = 0;
  const childrensSum = arr => {
    arr.forEach(item => {
      if (item.children) {
        sum++;
        childrensSum(item.children);
      }
    });
    return sum;
  };
  return childrensSum(arr);
}

function FilesList({ data, addTorrents }) {
  //const [sortDesc, setSortDesc] = useState(true);

  let groups = [],
    expandedItems = [];

  data.sort(compareStrings);

  const checkedItems = data.reduce((result, item) => {
    return [...result, item.title];
  }, []); //все файлы checked

  //группировка по папкам
  data.forEach(
    function(dataItem) {
      var filePath = dataItem.title.split("/"),
        last = filePath.pop();

      filePath
        .reduce(function(result, filePathItem) {
          if (!result[filePathItem]) {
            result[filePathItem] = { _: [] };
            result._.push({
              value: filePathItem,
              label: filePathItem,
              children: result[filePathItem]._
            });
            expandedItems.push(filePathItem); //все папки expanded
          }
          return result[filePathItem];
        }, this)
        ._.push({
          value: dataItem.title,
          label: (
            <>
              <div className="files-accordeon__group-item-title">{last}</div>
              <div className="files-accordeon__group-item-size">
                {dataItem.size}
              </div>
            </>
          )
        });
    },
    { _: groups }
  );

  if (groups.length === 1 && groups[0].children) groups = groups[0].children; //уберем общую корневую папку

  const [checked, setChecked] = useState(checkedItems);
  const [expanded, setExpanded] = useState(expandedItems);

  useEffect(() => {
    if (childrensCount(groups) >= 2) setExpanded([]);
  }, []);

  useEffect(() => {
    addTorrents(checked);
  }, [checked]);

  return (
    <div className="files-list">
      <div className="files-list__header">
        <div className="files-list__title">Файлы:</div>
        {/* <button className={`files-list__sort ${sortDesc ? "desc" : "asc" }`} onClick={()=>setSortDesc(!sortDesc)} /> */}
      </div>

      <div className="files-accordeon">
        <CheckboxTree
          nodes={groups}
          checked={checked}
          expanded={expanded}
          onCheck={checked => setChecked(checked)}
          onExpand={expanded => setExpanded(expanded)}
          showNodeIcon={false}
          showNodeTitle={false}
          lang={{ toggle: "" }}
        ></CheckboxTree>
      </div>
    </div>
  );
}

export default FilesList;
