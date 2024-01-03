function formatDoc(cmd, value=null) {
    if(value) {
        document.execCommand(cmd, false, value);
    }else{
        document.execCommand(cmd);
    }
}

function addLink() {
    const url = prompt('Insert Url');
    formatDoc('createLink',url);
}

const content = document.getElementById('content');

content.addEventListener('mouseenter', function() {
    const a = content.querySelectorAll('a');
    a.forEach(item => {
        item.addEventListener('mouseenter', function() {
            content.setAttribute('contenteditable',false);
            item.target = '_blank';
        })

        item.addEventListener('mouseleave', function() {
            content.setAttribute('contenteditable',true);
        })
    })
})


const showCode = document.getElementById('show-code');
const active = false;

showCode.addEventListener('click', function() {
    showCode.dataset.active = !active;
    active = !active;
    if(active) {
        content.textContent = content.innerHTML;
    }else{
        content.innerHTML = content.textContent;
    }
})

const fileName = document.getElementById('filename');

function fileHandle(value) {
    if(value === 'new'){
        content.innerHTML = '';
        fileName.value='Untitled';
    }else if(value === 'txt'){
        const blob = new Blob([content.innerText]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${fileName.value}.txt`;
        link.click();
    }
}