(function() {

    'use strict';

    angular.module('todo')
        .controller('ListController', ListController);

    ListController.$inject = ['item'];

    function ListController(ItemService) {
        var that = this;

        this.itemList = ItemService.getAll();
        console.log('getAll', this.itemList);

        this.newItem = {};
        this.addToList = function addToList(item) {
            ItemService.save(item);
            this.itemList = ItemService.getAll();
            clearInput();
        };


        function clearInput() {
            that.newItem = {};
        }
        // this.editedItem = {};
        // this.editItem = function editItem(editedItem) {
        //     ItemService.save(editedItem);
        // };

        // this.deleteItem = function deleteItem() {
        //
        // };


    }
})();
