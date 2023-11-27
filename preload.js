const fs=require("fs");
const os=require("os");
const path=require("path");

window.addEventListener("DOMContentLoaded",()=>{
var oldPreview=document.querySelector("#old");
var newPreview=document.querySelector("#new");
var name=document.querySelector("#cape");
var file=document.querySelector("#file");
var skins=path.join(os.homedir(),"AppData","Roaming",".minecraft","assets","skins");
document.querySelector("#customSkinsPath").addEventListener("click",()=>{skins=prompt("Enter custom full skins folder location path");});

if(fs.existsSync(`${skins}\\${name.value.substring(0,2)}\\${name.value}`)){
oldPreview.src=`${skins}\\${name.value.substring(0,2)}\\${name.value}?${new Date().getTime()}`;
}else{
oldPreview.src=`default_capes/${name.value}`;
}
name.addEventListener("change",e=>{
if(fs.existsSync(`${skins}\\${name.value.substring(0,2)}\\${name.value}`)){
oldPreview.src=`${skins}\\${name.value.substring(0,2)}\\${name.value}?${new Date().getTime()}`;
}else{
oldPreview.src=`default_capes/${name.value}`;
}
});
file.addEventListener("change",e=>{
newPreview.src=`${file.files[0].path}?${new Date().getTime()}`;
});
document.querySelector("#apply").addEventListener("dblclick",async e=>{
await fs.mkdirSync(`${skins}\\${name.value.substring(0,2)}`,{recursive:true});
await fs.copyFileSync(file.files[0].path,`${skins}\\${name.value.substring(0,2)}\\${name.value}`);
oldPreview.src=`${skins}\\${name.value.substring(0,2)}\\${name.value}?${new Date().getTime()}`;
});
document.querySelector("#reset").addEventListener("dblclick",async e=>{
await fs.unlinkSync(`${skins}\\${name.value.substring(0,2)}\\${name.value}`);
if(fs.existsSync(`${skins}\\${name.value.substring(0,2)}\\${name.value}`)){
oldPreview.src=`${skins}\\${name.value.substring(0,2)}\\${name.value}?${new Date().getTime()}`;
}else{
oldPreview.src=`default_capes/${name.value}`;
}
});

document.querySelectorAll(".tab").forEach(button=>{
button.addEventListener("click",e=>{
document.querySelector(`.tab.selected`).classList.remove("selected");
document.querySelector(`[name="${e.target.name}"]`).classList.add("selected");
document.querySelector(`.page.selected`).classList.remove("selected");
document.querySelector(`#${e.target.name}`).classList.add("selected");
});
});
});
