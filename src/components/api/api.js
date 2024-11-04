import axios from 'axios';

export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  async getGoodList() {
    const method = "OSGetGoodList";
    const apiKey = this._headers.authorization;
    const url = `${this._url}?ApiKey=${apiKey}&MethodName=${method}`;

    try {
      const response = await axios.get(url, {
        headers: {
          ...this._headers,
        },
      });
			console.log(response.data)
      return this._handleError(response.data);
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }

  async osSale(params) {
    const method = "OSSale";
    const apiKey = this._headers.authorization;
		const {
			Id,
			TableName,
			PrimaryKey,
			Price,
			Summa,
			ClientName,
			Phone,
			Email,
			PaymentTypeId,
			UseDelivery,
			DeliveryAddress,
			IsGift,
			MsgText,
			PName,
			PPhone
		} = params; 
	
		const url = `${this._url}/OSSale?ApiKey=${apiKey}&MethodName=${method}&Id=${Id}&TableName=${TableName}&PrimaryKey=${PrimaryKey}&Price=${Price}&Summa=${Summa}&ClientName=${ClientName}&Phone=${Phone}&Email=${Email}&PaymentTypeId=${PaymentTypeId}&UseDelivery=${UseDelivery}&DeliveryAddress=${DeliveryAddress}&IsGift=${IsGift}&MsgText=${MsgText}&PName=${IsGift}&PPhone=${IsGift}`;
    try {
      const response = await axios.post(url, {
      }, {
        headers: {
          ...this._headers,
        },
      });

      return this._handleError(response.data);
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }

  _handleError(result) {
    if (result.result !== 0) {
      throw new Error(`API ошибка: ${result.resultdescription}`);
    }
    return result;
  }
}

const api = new Api({
  baseUrl: "https://sycret.ru/service/api/api",
  headers: {
    authorization: "011ba11bdcad4fa396660c2ec447ef14",
    "Content-Type": "application/json",
  },
});


export default api;