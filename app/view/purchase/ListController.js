Ext.define('POS.view.purchase.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.list-purchase',

    control: {
        '#': {
            boxready: function(panel){
                var add = this.lookupReference('add');
                setTimeout(function(){
                    add.focus();
                }, 10);
            },
            selectionchange: function(sm, selected){
                var btnDetail = this.lookupReference('detail'),
                    btnEdit = this.lookupReference('edit'),
                    btnCancel = this.lookupReference('cancel');

                btnDetail.setDisabled(selected.length !== 1);
                btnEdit.setDisabled(selected.length !== 1);
                btnCancel.setDisabled(selected.length === 0);
            },
            celldblclick: function(){
                this.detail();
            }
        }
    },
    
    add: function(){
        Ext.fn.App.window('add-purchase');
    },

    detail: function(){
        var rec     = this.getView().getSelectionModel().getSelection()[0],
            params  = {
                id: rec.get('id')
            };

        var detail = Ext.fn.App.window('detail-purchase');
        detail.getController().load(params);
    },

    edit: function(){
        var rec     = this.getView().getSelectionModel().getSelection()[0],
            params  = {
                id: rec.get('id')
            };

        var edit = Ext.fn.App.window('edit-purchase');
        edit.getController().load(params);
    },
    
    cancel: function(){
        var sm      = this.getView().getSelectionModel(),
            sel     = sm.getSelection(),
            smCount = sm.getCount();

        Ext.Msg.confirm(
            '<i class="fa fa-exclamation-triangle glyph"></i> Batalkan Penjualan ',
            '<p><b>Apakah Anda yakin akan membatalkan penjualan (<span style="color:red">' + smCount + ' data</span>)?</b>',
            function(btn){
                if (btn == 'yes'){
                    var id = [];
                    for(i=0;i<smCount;i++){
                        id.push(sel[i].get('id'));
                    }

                    Ext.fn.App.setLoading(true);
                    Ext.ws.Main.send('purchase/destroy', {id: id});
                    var monitor = Ext.fn.WebSocket.monitor(
                        Ext.ws.Main.on('purchase/destroy', function(websocket, data){
                            clearTimeout(monitor);
                            Ext.fn.App.setLoading(false);
                            if (data.success){
                                POS.app.getStore('POS.store.Purchase').load();
                            }else{
                                Ext.fn.App.notification('Ups', data.errmsg);
                            }
                        }, this, {
                            single: true,
                            destroyable: true
                        })
                    );
                }
            }
        );
    },
    
    search: function(){
        Ext.fn.App.window('search-purchase');
    },
    
    reset: function(){
        this.getView().getStore().search({});
    }
});
