class Bar{
    constructor(item=document.getElementById('bar')){
        this.container=item;
        this.colorBox = this.render();
        this.container.appendChild(this.colorBox);
        this.begin();
    }
    render(){
        //渲染这个div容器
        let colorBox=document.createElement('div');
        colorBox.className='inside';
        return colorBox;
    }
    begin(status = 0) {
        //开始加载
        this.status = status;
        this.loading(this.colorBox);
    }
    loading(ele){
        //修改进度
        ele.style.width=this.status+'%';
    }
}