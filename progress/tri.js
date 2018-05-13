class sand{
    constructor(item=document.getElementById('tri')){
        this.container=item;
        this.container.appendChild(this.render());
        this.begin();
    }
    render(){
        let t=document.createElement('div');
        t.className='t';
        this.color=document.createElement('div');
        this.color.className = 'color';
        t.appendChild(this.color);
        return t;
    }
   begin(percent=0) {
        this.draw(percent);
    }
    draw(percent){
        const partition=4/7;
        const S=700;
        let top=Math.sqrt((100-percent)/100*(7*S/4));             
        let left=top*partition;
        this.color.style.borderTopWidth=top+'px';
        this.color.style.borderBottomWidth = top + 'px';
        this.color.style.borderLeftWidth = left + 'px';
        this.color.style.borderRightWidth = left + 'px';
    }
}