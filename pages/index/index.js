// index.js

var app = getApp();
var calc = require("../../utils/calc");
var firebase = require("../../utils/firebase-app.js");
// var base_url = require("../../utils/base_url.js");

Page({
  data: {
    baseUrl: "https://api-v2.alenplc.com/api/v2",
    // baseUrl: "http://php1demo.biisho.com",
    // baseUrl: base_url,
    selectedWaresInfo: undefined,
    waresList: [
      {
        id: 1,
        imageType: 1,
        price: 1000,
        currency: "USD",
        title: "diamond_1",
        className: "per perb",
      },
      {
        id: 2,
        imageType: 2,
        price: 2000,
        currency: "USD",
        title: "diamond_2",
        selected: false,
        className: "per perb",
      },
      {
        id: 3,
        imageType: 3,
        price: 5000,
        currency: "USD",
        title: "diamond_3",
        selected: false,
        className: "per perb",
      },
      {
        id: 4,
        imageType: 4,
        price: 10000,
        currency: "USD",
        title: "diamond_4",
        selected: false,
        className: "per perb",
      },
      {
        id: 5,
        imageType: 5,
        price: 20000,
        currency: "USD",
        title: "diamond_5",
        selected: false,
        className: "per perb",
      },
      {
        id: 6,
        imageType: 6,
        price: 50000,
        currency: "USD",
        title: "diamond_6",
        selected: false,
        className: "per perb",
      },
      {
        id: 7,
        imageType: 7,
        price: 100000,
        currency: "Ks",
        title: "diamond_7",
        selected: false,
        className: "per perb",
      },
    ],
    cat_data: null,
    cat_sub_data: null
  },
  // onLoad(options) { },
  onLoad: function () {
    var timestamp = new Date().getTime();
    console.info("index page on load at: " + timestamp);

    calc.reset();
    var that = this;

    console.log(firebase);

    ma.request({
      url: this.data.baseUrl + `/categories?pageSize=10`,
      method: "GET",
      // data: data,
      success: (res) => {
        console.log("cat-res_id", res.data.categories)
        // this.data.cat_data.push(res.data.data.data)
        this.setData({
          cat_data: res.data.categories,
          isLoading: false
        })

      },
    });
    ma.request({
      url: this.data.baseUrl + `/categories/sub-categories`,
      method: "GET",
      // data: data,
      success: (res) => {
        console.log("cat-re", res.data.data.category)
        // this.data.cat_data.push(res.data.data.data)
        this.setData({
          cat_sub_data: res.data.data.category,
          isLoading: false
        })

      },
    });
  },
  onReady() {

  },
  onShow() { },
  onHide() { },
  onUnload() { },
  onShareAppMessage() {
    return {
      title: "",
    };
  },

  waresSelect(e) {
    let itemid = e.currentTarget.dataset.itemid;
    let selectedItem;
    this.data.waresList.map((el) => {
      if (el.id == itemid) {
        selectedItem = el;
        el.className = "per per-act";
      } else {
        el.className = "per perb";
      }
    });
    this.setData({
      selectedWaresInfo: selectedItem,
      waresList: this.data.waresList,
    });
  },

  buyGoods() {
    if (!this.data.selectedWaresInfo) {
      ma.showToast({ title: "please select a ware" });
      return;
    }
    ma.request({
      url: this.data.baseUrl + "/create/order",
      method: "POST",
      data: {
        title: this.data.selectedWaresInfo.title,
        amount: this.data.selectedWaresInfo.price + "",
      },
      success: (res) => {
        this.startPay(res.data);
      },
    });
  },
  startPay(rawRequest) {
    console.log({ rawRequest: rawRequest.trim() });

    ma.startPay({
      rawRequest: rawRequest.trim(),
      success: (res) => {
        ma.showToast({ title: "res = " + res.resultCode });
      },
    });
  },
  categoryClicked() {
    console.log("Catgeory Clicke")
    ma.navigateTo({
      url: 'category/category',
      events: {
        acceptData: function (data) {
          console.log("from_home_page", data)
        }
      },
      success: function (res) {
        res.eventChannel.emt('acceptData')
      }
    })
  },
  testClicked() {
    ma.navigateTo({
      url: 'test/test',
      success: function (res) {
        res.eventChannel.emit("from_home_to_test", {
          data: 'exmaple'
        })
      }
    })
  }
});
