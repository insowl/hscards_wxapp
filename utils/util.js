var baseURL = "https://hs.blizzard.cn/"
var GET_METHOD = "GET"
var POST_METHOD = "POST"
var GET_HEADER = {            
        }
var POST_HEADER = {            
        }

function request(api, method, header, params, success){
    // wx.showToast({
    //     icon: "loading",
    //     title: "旅店老板正在搜索牌库...",
    //     duration: 10000
    // })
    wx.request({
        url: baseURL + api,
        method: method,
        header: header,
        data: params,
        success: function(res) {
            wx.hideToast()
            success(res)
        },
        fail: function(){
            wx.showToast({
                icon: "loading",
                title: "炉石旅店断网了...",
                duration: 6000
            })
        }
    })
}

function get(api, params, success){
    request(api, GET_METHOD, GET_HEADER, params, success)
}

function post(api, params, success){
    request(api, POST_METHOD, POST_HEADER, params, success)
}

function classParam2Text(param){
    var text = '';
    switch(param){
        case 'druid': 
            text = '德鲁伊'
            break;
        case 'hunter': 
            text = '猎人'
            break;
        case 'mage': 
            text = '法师'
            break;
        case 'paladin': 
            text = '圣骑士'
            break;
        case 'priest': 
            text = '牧师'
            break;
        case 'rogue': 
            text = '潜行者'
            break;
        case 'shaman': 
            text = '萨满'
            break;
        case 'warlock': 
            text = '术士'
            break;
        case 'warrior': 
            text = '战士'
            break;
        case 'neutral': 
            text = '中立'
            break;
        default:
            text = '全部职业'
    }
    return text
}

function costParam2Text(param){
    var text = ''
    switch(param){
        case '0':
            text = '0'
            break;
        case '1':
            text = '1'
            break;
        case '2':
            text = '2'
            break;
        case '3':
            text = '3'
            break;
        case '4':
            text = '4'
            break;
        case '5':
            text = '5'
            break;
        case '6':
            text = '6'
            break;
        case '7':
            text = '7+'
            break;
        default:
            text = '全部'
    }
    return text
}

function standardParam2Text(param){
    var text = ''
    switch(param){
        case '1':
            text = '标准卡牌'
            break;
        case '0':
            text = '狂野卡牌'
            break;
        default:
            text = ''
    }
    return text
}

function typeParam2Text(param){
    var text = ''
    switch(param){
        case 'spell':
            text = '法术'
            break;
        case 'minion':
            text = '随从'
            break;
        case 'weapon':
            text = '武器'
            break;
        default:
            text = param
    }
    return text
}

function setParam2Text(param){
    var text = ''
    switch(param){
        case 'basic':
            text = '基本'
            break;
        case 'classic':
            text = '经典'
            break;
        case 'naxx':
            text = '纳克萨玛斯'
            break;
        case 'gvg':
            text = '地精大战侏儒'
            break;
        case 'brm':
            text = '黑石山的火焰'
            break;
        case 'tgt':
            text = '冠军的试练'
            break;
        case 'loe':
            text = '探险者协会'
            break;
        case 'wotog':
            text = '上古之神的低语'
            break;
        case 'karazhan':
            text = '卡拉赞之夜'
            break;
        case 'msog':
            text = '龙争虎斗加基森'
            break;
        case 'ungoro':
            text = '勇闯安戈洛'
            break;
        case 'kotf':
            text = '冰封王座的骑士'
            break;
        default:
            text = param
    }
    return text
}

module.exports = {
    GET: get,
    POST: post,
    classParam2Text: classParam2Text,
    costParam2Text: costParam2Text,
    standardParam2Text: standardParam2Text,
    typeParam2Text: typeParam2Text,
    setParam2Text: setParam2Text
}
