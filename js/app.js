(function (Vue) {
	//初始化任务
	const items = [
		// {
		// 	id: 1,
		// 	content: 'vue.js',
		// 	completed: false //是否完成
		// },
		// {
		// 	id: 2,
		// 	content: 'java',
		// 	completed: true
		// },
		// {
		// 	id: 3,
		// 	content: 'pyhton',
		// 	completed: false
		// }
	]

	// Your starting point. Enjoy the ride!
	var STORAGE_KEY ='items-vuejs'

	const itemStorage ={
		fetch:function(){
			return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
		},
		save:function(items){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(items));
		}
	}

	Vue.directive('app-focus',{
		inserted(el,binding){
			el.focus()
		}
	})
	window.onhashchange=function(){
		// console.log('hash:',window.location.hash)
		const hash = window.location.hash.substr(2) || 'all'
		app.filterStatus = hash
	}
	var app = new Vue({
		el: '#todoapp',
		data:{
			items:itemStorage.fetch(),
			currentItem:null,
			filterStatus:'all',
		},
		watch: {
			items:{
				deep:true,
				handler:function(newItems,oldItems){
					itemStorage.save(newItems)
				}
			}
		},
		directives:{
			'todo-focus':{
				update(el,binding){
					if(binding.value){
						el.focus()
					}
				}
			}
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
			},
			finishEdit(item,index,event){
				const content = event.target.value.trim()
				if(!event.target.value.trim()){
					this.removeItem(index)
					return
				}

				item.content = content
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
			filterItems(){
				switch(this.filterStatus){
					case "active":
						return this.items.filter(item=>!item.completed)
						break
					case "completed":
						return this.items.filter(item=>item.completed)
						break
					default:
						return this.items
				}
			}
		},
	})
	
	window.onhashchange()
})(Vue);