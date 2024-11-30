    var form=document.getElementById('search-form');
    function search(e) {
        const effectValue=e.srcElement['keyword'].value.trim();
        if(!effectValue){
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        return true;
    }
    form.addEventListener("submit", search);