(function (Vue) {
	//初始化任务
	const items = [
		{
			id: 1,
			content: 'vue.js',
			completed: false //是否完成
		},
		{
			id: 2,
			content: 'java',
			completed: true
		},
		{
			id: 3,
			content: 'pyhton',
			completed: false
		}
	]
	// Your starting point. Enjoy the ride!
	var app = new Vue({
		el: '#todoapp',
		data:{
			items,
			currentItem:null
		},
		methods: {
			addItem(event){
				const content = event.target.value.trim()
				if(!content.length){
					return
				}

				const id = items.length + 1
				this.items.push({
					id,
					content,
					completed:false
				})

				event.target.value=""
			},
			removeItem(index){
				this.items.splice(index,1)
			},
			removeCompleted(){
				return this.items = this.items.filter(item=>!item.completed)
			},
			toEdit(item){
				this.currentItem = item
			},
			cancelEdit(){
				console.log('ESC')
				this.currentItem = null
			}
		},
		computed: {
			remaining(){
				return this.items.filter(item=>!item.completed).length
			},
			toggleAll:{
				get(){
					return this.remaining ===0
				},
				set(newStatus){
					this.items.forEach(item => {
						item.completed = newStatus
					});
				}
			},
		},
	})
})(Vue);