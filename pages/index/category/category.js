Page({
  data: {

  },
  onLoad(options) {

  },
  onReady() {
    ma.request({
      url: "http://localhost:8000/api/categories?order_by=desc",
      method: "GET",
      // data: data,
      success: (res) => {
        console.log("cat-res", res.data.data.data)
        this.data.cat_data.push(res.data.data.data)
        // this.onReady(res.data);
        // this.onShow(res.data);
        // this.onLoad(res.data);
      },
    });
  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
  subCategoryClicked() {
    console.log("Catgeory Clicke")
    ma.navigateTo({
      url: '../test/test',
    })
  },
  navigateToSubCategory() {
    ma.navigateTo({
      url: '../subcategory/subcategory',
    })
  }
});