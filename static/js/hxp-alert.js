var hxpAlert = {
			data:{
				text:"网络拥挤，请稍后再试。",
				hxp_alert_modal:null,
				hxp_alert_ok:null,
				hxp_alert_text:null,
				show:false
			},
			init:function(){
				this.data.hxp_alert_modal = document.getElementById("hxp_alert_modal")
				this.data.hxp_alert_modal.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,0.5);z-index: 10241024;align-items: center;justify-content: center;display:none;"
				this.data.hxp_alert_modal.innerHTML = "<div style='width: 300px;background: #fff;border-radius: 5px'><div id='hxp_alert_text' style='font-size: 20px;padding: 0 30px;line-height: 50px;display: flex;align-items: center;justify-content: center;min-height: 150px;text-align: center;'></div><div id='hxp_alert_ok' style='cursor: pointer;color: #fe6549;font-size: 20px;line-height: 50px;border-top: 1px solid #dedede;display: flex;align-items: center;justify-content: center;'>确定</div></div>"
				this.data.hxp_alert_ok = document.getElementById("hxp_alert_ok")
				var that = this;
				this.data.hxp_alert_ok.onclick = function(){
					that.close();
				}
				this.data.hxp_alert_text = document.getElementById("hxp_alert_text")
			},
			show(text){
				if(this.data.show) return;
				if(text){
					this.data.hxp_alert_text.innerHTML = text;
				}else{
					this.data.hxp_alert_text.innerHTML = this.data.text;
				}
				if(!this.data.show){
					this.data.hxp_alert_modal.style.display = 'flex';
					this.data.show = true
				}
			},
			close(){
				if(this.data.show){
					this.data.hxp_alert_modal.style.display = 'none';
					this.data.show = false
				}
			}
		}
		hxpAlert.init();