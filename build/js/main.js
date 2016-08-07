(function() {

    'use strict';

    angular.module('todo', []);

})();

(function() {
    'use strict';

    angular.module('todo')
        .factory('item', ItemService);

    function ItemService() {
        return {
            getAll: getAll,
            saveItem: saveItem,
            deleteItem: deleteItem
        };
    }

    function getAll() {
        var itemList = JSON.parse(localStorage.getItem('itemList'));
        return itemList;
    }

    function saveItem(item) {
        var itemList = JSON.parse(localStorage.getItem('itemList'));

        var data = {
            text: item.text,
            createdOn: new Date(),
            completed: false
        };

        itemList.push(data);

        localStorage.setItem('itemList', angular.toJson(itemList));

        return data;

    }

    function deleteItem(index) {
        var itemList = JSON.parse(localStorage.getItem('itemList'));

        if (index >= 0) {
            itemList.splice(index, 1);
        }

        localStorage.setItem('itemList', angular.toJson(itemList));
    }

    // function edit(text) {
    //     var itemList = JSON.parse(localStorage.getItem('itemList'));
    //
    //     var theFoundItem = null;
    //
    //     if (!text || typeof(text) !== 'string') {
    //         return theFoundItem;
    //     }
    //
    //     itemList.forEach(function findItem(item) {
    //         if (item.text === text) {
    //             theFoundItem = item;
    //         }
    //     });

})();

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
            ItemService.saveItem(item);
            this.itemList = ItemService.getAll();
            clearInput();
        };

        function clearInput() {
            that.newItem = {};
        }

        this.clearDeletedItem = function clearDeletedItem(index) {

            that.itemList.splice(index, 1);

            ItemService.deleteItem(index);
        };




        // this.editedItem = {};
        // this.editItem = function editItem(editedItem) {
        //     ItemService.save(editedItem);
        // };

        // this.deleteItem = function deleteItem() {
        //
        // };


    }
})();

//# sourceMappingURL=main.js.map