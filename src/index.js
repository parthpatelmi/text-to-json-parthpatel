import "./styles.css";
let data = document.getElementById("data");
let text = document.getElementById("text");
text.oninput = () => convertJson(text);
// convertJson(textValue);
function convertJson(text) {
  // console.log("fn called");
  let textValue = text.value;
  let res = textValue.split(/\r?\n/g).filter((line) => line.trim());
  let curr = null;
  const result = res.reduce((acc, line) => {
    if (/\s#\d+/.test(line)) {
      // array entry
      let [key, index] = line.split(" #");
      key = key.trim();
      index = +index;
      curr = { key, index }; // save the key and index
      let a = (acc[key] = acc[key] || []); // initialise the array if needed
      a[index] = a[index] || {}; // initialise the object at the given index
    } else {
      let [key, ...value] = line.split(":");
      value = value.join(":").trim();
      if (key.startsWith(" ")) {
        // array
        acc[curr.key][curr.index][key.trim()] = value;
      } else {
        // root
        acc[key.trim()] = value;
      }
    }
    return acc;
  }, {});
  console.log(JSON.stringify(result, null, 4));
  data.innerText = JSON.stringify(result, null, 4);
}
