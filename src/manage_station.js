import DomUtils from './dom_utils.js';
import TableUtils from './table_utils.js';
import CommonUtils from './common_utils.js';

export default class ManageStation {
  constructor() {
    this.setPrivateVariable();
    this.setConst();
    this.stationInputSection();
    this.stationListSection();
  }

  setPrivateVariable() {
    this._privateDomUtils = new DomUtils();
    this._privateCommonUtils = new CommonUtils();
    this._staionList = [];
    this._privateTableUtils = new TableUtils();
  }

  setConst() {
    this.MENU_TYPE = 'station',
    this.ADD_TYPE = 'Add',
    this.DELETE_TYPE = 'Delete',

    this.STATION_INPUT_TITLE_TAG = 'div';
    this.STATION_INPUT_TITLE_TEXT = '역 이름';
    this.STATION_LIST_TITLE_TAG = 'h1';
    this.STATION_LIST_TITLE_TEXT = '🚉 지하철 역 목록';

    this.ARTICLE_NAME = 'stationArticle';
    
    this.SETTING = '설정';
    this.STATION_LIST = '지하철 역 목록';

    this.STATION_INPUT_ID = 'station-name-input';
    this.ADD_BUTTON_ID = 'station-add-button';
    this.DELETE_BUTTON_CLASS = 'station-delete-button';

    this.STATION_INPUT_PLACEHOLDER = '역 이름을 입력해주세요';
    this.STATION_INPUT_TYPE = 'String';
    this.MINLENGTH_ERROR_MESSAGE = '역 이름을 두 글자 이상 입력해주세요';
    this.OVERLAP_ERROR_MESSAGE = '이미 존재하는 역입니다.'


    this.ADD_BUTTON_TEXT = '역 추가';
    this.DELETE_BUTTON_TEXT = '삭제';
    this.DELETE_ALERT_MESSAGE = '정말로 삭제하시겠습니까?';

    this.IS_VALID = true;
    this.IS_NOT_VALID = false;
  }

  stationInputSection() {
    this._privateCommonUtils.createTitle(this.STATION_INPUT_TITLE_TAG, this.STATION_INPUT_TITLE_TEXT, this.ARTICLE_NAME);
    this.createStationInput();
    this._stationAddButton = this._privateDomUtils.createButton(this.ADD_BUTTON_ID, this.ADD_BUTTON_TEXT);
    this._privateDomUtils.appendTo(this.ARTICLE_NAME, this._stationAddButton);
    this.addEventToButton(this.ADD_TYPE, this.MENU_TYPE);
  }

  stationListSection() {
    this._privateCommonUtils.createTitle(this.STATION_LIST_TITLE_TAG, this.STATION_LIST_TITLE_TEXT, this.ARTICLE_NAME);
    this.createStationListTable();
  }

  createStationInput() {
    const inputObject = this.stationInputObject();

    this._stationInput = this._privateDomUtils.createInput(inputObject);
  }

  stationInputObject() {
    const inputObject = {
      'toIdName': this.ARTICLE_NAME,
      'idName': this.STATION_INPUT_ID,
      'placeholder': this.STATION_INPUT_PLACEHOLDER,
      'type': this.STATION_INPUT_TYPE,
    }

    return inputObject;
  }

  addEventToButton(buttonType, menuType) {
    this[`_station${buttonType}Button`].addEventListener('click', () => {
      this.addStation();
    })
    this[`_${menuType}Input`].addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.addStation();
      }
    })
  }

  addStation() {
    if (this.checkStationValidity() === this.IS_VALID) {
      this.addToStationList(this._stationInput.value);
      this._stationInput.value = '';
    }
    console.log(this._staionList); 
  }

  checkStationValidity() {
    if (this.minLength() === this.IS_NOT_VALID) {
      this.alertError(this.MINLENGTH_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    if (this.overlap() === this.IS_NOT_VALID) {
      this.alertError(`"${this._stationInput.value}"은/는 ` + this.OVERLAP_ERROR_MESSAGE)

      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  minLength() {
    if (this._stationInput.value.length <= 1) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  overlap() {
    if (this._staionList.indexOf(this._stationInput.value) !== -1) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  alertError(errorMessage) {
    alert(errorMessage);
  }

  addToStationList(stationName) {
    this._staionList.push(stationName);
    this._privateTableUtils.insertToTable();
  }

  createStationListTable() {
    this._stationTable = this._privateTableUtils.createTable(this.ARTICLE_NAME);
  }
}