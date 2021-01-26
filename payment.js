const errors = require('./errors.js');
const axios = require('axios');

class Payment {

  /**
   * @param config {
   *     tran_type : { type: String },
   *     tran_class : { type : String },
   *     cart_currency : { type : String },
   *     callback : { type : String },
   *     return : { type : String }
   * }
   * @param auth {
   *     profile_id : { type : Number },
   *     server_key : { type : String }
   * }
   */

  constructor(auth, config) {
    // Errors
    this.ValidationError = errors.ValidationError;
    this.auth = auth;
    this.config = config;
    this._validateConfiguration();
    this._validateAuth();
    this._createHttpClient();
  }

  _validateConfiguration() {
    if (!this.config.tran_type || !this.config.tran_class || !this.config.cart_currency || !this.config.callback || !this.config.return) {
      throw new this.ValidationError('the config not completed !');
    }
  }

  _validateAuth() {
    if (!this.auth.profile_id || !this.auth.server_key) {
      throw new this.ValidationError('the auth not completed !');
    }
  }

  _createHttpClient() {
    this.instance = axios.create({
      baseURL: 'https://secure-egypt.paytabs.com'
    });
    this.instance.defaults.headers.common.Authorization = this.auth.server_key;
  }

  /**
   *@param obj {
   *    cart_id: { type: String },
   *    cart_description: { type: String },
   *    cart_amount: { type : Number },
   *    customer_details: {
   *		name: { type: String },
   *		email: { type: String },
   *		street1: { type: String },
   *		city: { type: String },
   *		zip: { type: Number },
   *		country: { type: String },
   *	}
   * }
   */

  async createPaymentRequest(obj) {
    const requestData = {
      ...this.config,
      profile_id: this.auth.profile_id,
      hide_shipping: true,
      ...obj
    };
    this._validatePaymentRequestData(requestData);
    const { data } = await this.instance.post('/payment/request', requestData);
    return data;
  }

  _validatePaymentRequestData(data) {
    if (
      !data.cart_id ||
      !data.cart_description ||
      !data.cart_amount ||
      !data.customer_details.name ||
      !data.customer_details.email ||
      !data.customer_details.street1 ||
      !data.customer_details.city ||
      !data.customer_details.zip ||
      !data.customer_details.country
    ) {
      throw new this.ValidationError('the data not completed !');
    }
  }

  async getTransaction(tran_ref) {
    const requestData = {
      profile_id: this.auth.profile_id,
      tran_ref
    };
    const { data } = await this.instance.post('/payment/query', requestData);
    return data;
  }

}

const instance = new Payment(
  { profile_id: 56772, server_key: 'SRJN9DN9DK-JBBT9WRRDB-BWNDWLG26G' },
  {
    tran_type: 'sale',
    tran_class: 'ecom',
    cart_currency: 'EGP',
    callback: 'https://api.dev.yo-go.co/',
    return: 'https://api.dev.yo-go.co/'
  }
);
