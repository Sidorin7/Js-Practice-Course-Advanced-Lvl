const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg (block) {
        const img = block.querySelector('img');
        // something.png = something-1.png
        img.src = img.src.slice(0, -4) + '-1.png';// отрезали 4 сивола с конца и добавили новых 6 символов
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
            // p.remove()
        });
    }
    function hideImg (block) {
        const img = block.querySelector('img');
        //something-1.png  => something.png 
        img.src = img.src.slice(0, -6) + '.png';// отрезали 6 сивола с конца и добавили новых 4 символов
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
            // p.remove()
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', ()=> {// событие когда мышь находить над элементом
            showImg(block);
        })
        block.addEventListener('mouseout', ()=> {
            hideImg(block);
        })
    })
};

export default pictureSize;