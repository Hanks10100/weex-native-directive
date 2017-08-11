// { "framework": "Vanilla" }

const uniqueId = (function(){
  let count = Math.floor(Math.random() * 6666 + 1000)
  return function () {
    return String(count++)
  }
})()

function generateData (seq) {
  return seq.split('').map((type, index) => {
    const props = {}

    if (type === 'A') {
      props.label = 'A'.repeat(Math.floor(Math.random() * 3 + 3))
      props.number = Math.floor(Math.random() * 30)
    }
    if (type === 'B') {
      props.dataset = []
      let n = Math.floor(Math.random() * 4 + 2)
      while (n--) {
        props.dataset.push({
          name: Math.random().toString(36).substr(2, 6).toUpperCase()
        })
      }
    }
    if (type === 'C') {
      props.count = Math.floor(Math.random() * 15)
    }

    return Object.assign({ type, index }, props)
  })
}

let banner = '-----'
let ratio = 4
const createId = document.addCallback(() => ratio++)
const updateId = document.addCallback(() => ratio++)

// <recycle-list>
sendTasks(id, [{
    module: 'dom',
    method: 'createBody',
    args: [{
        "ref": "_root",
        "type": "recycle-list",
        "attr": {
            "listData": generateData('ACBCCABAACB'),
            "templateKey": "type"
        },
        "style": {}
    }]
}])

// <cell-slot> A
sendTasks(id, [{
    module: 'dom',
    method: 'addElement',
    args: ["_root", {
        "ref": uniqueId(),
        "type": "cell-slot",
        "attr": {
            "templateType": "A",
            "append": "tree"
        },
        "style": {
            "width": 650,
            "marginLeft": 50,
            "marginTop": 50,
            "borderWidth": 2,
            "borderStyle": "solid",
            "borderColor": "#DDDDDD"
        },
        "children": [{
            "ref": uniqueId(),
            "type": "text",
            "attr": {
                "dataLabel": { "@binding": "label" },
                "value": ["Current Label: ", { "@binding": "label" }]
            }
        }, {
            "ref": uniqueId(),
            "type": "text",
            "attr": {
                "[[match]]": "number > 20",
                "value": "Large"
            }
        }, {
            "ref": uniqueId(),
            "type": "text",
            "attr": {
                "[[match]]": "number > 10",
                "value": "Medium"
            }
        }, {
            "ref": uniqueId(),
            "type": "text",
            "attr": {
                "[[match]]": "number <= 10",
                "value": "Small"
            }
        }]
    }, -1]
}])

// <cell-slot> B
sendTasks(id, [{
    module: 'dom',
    method: 'addElement',
    args: ["_root", {
        "ref": uniqueId(),
        "type": "cell-slot",
        "attr": {
            "templateType": "B",
            "append": "tree"
        },
        "style": {
            "width": 650,
            "marginLeft": 50,
            "marginTop": 50,
            "borderWidth": 2,
            "borderStyle": "solid",
            "borderColor": "#DDDDDD"
        },
        children: [{
            "ref": uniqueId(),
            "type": "div",
            "attr": {
              "[[repeat]]": {
                "@exp": "dataset",
                "@key": "i",
                "@label": "item"
              }
            },
            "children": [{
                "ref": uniqueId(),
                "type": "text",
                "attr": {
                    "value": banner
                }
            }, {
                "ref": uniqueId(),
                "type": "text",
                "attr": {
                    "value": [{ "@binding": "i" }, ": ", { "@binding": "item.name" }]
                }
            }]
        }]
    }, -1]
}])

// <cell-slot> C
sendTasks(id, [{
    module: 'dom',
    method: 'addElement',
    args: ["_root", {
        "ref": uniqueId(),
        "type": "cell-slot",
        "attr": {
            "templateType": "C",
            "append": "tree"
        },
        "style": {
            "width": 650,
            "marginLeft": 50,
            "marginTop": 50,
            "borderWidth": 2,
            "borderStyle": "solid",
            "borderColor": "#DDDDDD"
        },
        "children": [{
            "ref": uniqueId(),
            "type": "div",
            "event": [{
              "type": "click",
              "args": [{ "@binding": "index" }]
            }],
            "children": [{
                "ref": uniqueId(),
                "type": "text",
                "attr": {
                    "value": ["Number: ", { "@binding": "count" }]
                },
                "style": {
                    "width": 400,
                    "fontSize": 50,
                    "marginTop": 50,
                    "marginLeft": 50,
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": "#CCCCCC",
                    "backgroundColor": "#F4F4F4"
                }
            }, {
                "ref": uniqueId(),
                "type": "text",
                "attr": {
                    "[[lifecycle]]": {
                      "@create": createId,
                      "@update": updateId,
                    },
                    "value": [
                      { "@binding": "count" },
                      ` * ${ratio} = `,
                      { "@binding": `count * ${ratio}` }
                    ]
                },
                "style": {
                    "width": 400,
                    "fontSize": 50,
                    "marginTop": 50,
                    "marginLeft": 50,
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": "#CCCCCC",
                    "backgroundColor": "#F4F4F4"
                }
            }]
        }]
    }, -1]
}])

sendTasks(id, [{ module: 'dom', method: 'createFinish', args: [] }], -1)

// TODO: add event on Element
// const $el = document.getRef(eventNodeId)
// $el.addEvent('click', () => {
//   const cell = this.longList[index]
//   if (cell) {
//     cell.count++
//   }
// })
