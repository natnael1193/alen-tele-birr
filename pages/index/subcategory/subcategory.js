Page({
  data: {
    cat_data: null,
    sub_cat_id: ''
  },
  onLoad(option) {
    console.log("loading", option.id)
    this.setData({
      isLoading: true
    })
    ma.request({
      url: `http://localhost:8000/api/category/${option.id}`,
      method: "GET",
      // data: data,
      success: (res) => {
        console.log("cat-res_id", res.data.data)
        // this.data.cat_data.push(res.data.data.data)
        this.setData({
          cat_data: res.data.data,
          isLoading: false
        })

      },
    });
  },
  onReady() {
    // console.log("onReady", sub_cat_id)

  },
  onShow() {
    // console.log("onShow", sub_cat_id)
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
  navigateToService(e) {
    const id = e.target.dataset.itemid
    console.log('id', id)
    ma.navigateTo({
      url: `../service/service?id=${id}`,
    })
  }
});