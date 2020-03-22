import React, {Component} from 'react';
import Select from 'react-select';

import './FlashScreenSettings.css';

class FlashScreenSettings extends Component {
    state = {
        n: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            0: false
        },
        ns: {value:1, label: '1'},
        pns: false,
        i: {value:1, label: '1'},
        pi: false,
        s: {value:1, label: '1'},
        ps: false,
        t: {value:1, label: '1'},
        showDigitsWarning: false,
        loading: true,
        loaded: false
    };

    componentDidMount(){
        if(this.state.loading && !this.state.loaded){
            const {settings} = this.props;

            this.setState({
                n: settings.n,
                ns: {value:settings.ns, label: `${settings.ns}`},
                pns: settings.pns,
                i: {value:settings.i, label: `${settings.i}`},
                pi: settings.pi,
                s: {value:settings.s, label: `${settings.s}`},
                ps: settings.ps,
                t: {value:settings.t, label: `${settings.t}`},
                loading: false,
                loaded: true
            })
        }
    }

    render(){
        return this.getSettings();
    }

    getSettings = () => {
        return (
            <div className="flash-game">

                {this.getNumberWarning()}

                <div className="settings-wrapper">
                    <div className="settings-block">

                        <table>
                            <tbody>

                                {this.getOptionNumbers()}

                                {this.getOptionsNumberSize()}

                                {this.getOptionsNumberProgress()}

                                {this.getOptionsImpulse()}

                                {this.getOptionsImpulseProgress()}

                                {this.getOptionsSpeed()}

                                {this.getOptionsSpeedProgress()}

                                {this.getOptionsTasks()}

                            </tbody>
                        </table>

                        <div className="fs-save">
                            <span
                                onClick={this.handleClickSave}
                            >СОХРАНИТЬ</span>
                        </div>
                    </div>

                </div>
            </div>
        )
    };


    getOptionNumbers = () => {
        if(this.state.loaded && !this.state.loading){
            const {n} = this.state;

            let numbers = Object.keys(n).map(key => key);
            let states = Object.keys(n).map(key => n[key]);

            let digitsHTML = numbers.map((value, index) => {
                if(states[index]){
                    return this.getSelectedNumber(value)
                }else{
                    return this.getNonSelectedNumber(value)
                }
            });

            return (
                <tr>
                    <td>Цифры</td>
                    <td className="fs-digits">
                        {digitsHTML}
                    </td>
                </tr>
            )
        }else return null;
    };
    getSelectedNumber = (key) => {
        return (
            <span
                className="fs-n-number fs-n-number-selected"
                onClick={this.handleOptionNumberChange.bind(this, key, false)}
                key={key}
            >{key}</span>
        )
    };
    getNonSelectedNumber = (key) => {
        return (
            <span
                className="fs-n-number"
                onClick={this.handleOptionNumberChange.bind(this, key, true)}
                key={key}
            >{key}</span>
        )
    };
    handleOptionNumberChange = (number, checked) => {
        const { n } = this.state;
        // Makes link between state of different scopes? TFW? -> Use Object.assign !!!
        let buffer = Object.assign({}, n);
        let checkedCount = 0;
        buffer[number] = checked;


        // eslint-disable-next-line
        Object.keys(buffer).map(key => {
            if(buffer[key]) checkedCount++
        });

        if(checkedCount === 1){
            this.setState({
                showDigitsWarning: true
            })
        }else{
            this.setState({
                n: buffer
            })
        }
    };


    getOptionsNumberSize = () => {
        const options = [
            { value: 1, label: '1'}, { value: 2, label: '2'}, { value: 3, label: '3'}, { value: 4, label: 4}, { value: 5, label: '5'},
            { value: 6, label: '6'}, { value: 7, label: '7'}, { value: 8, label: '8'}, { value: 9, label: '9'}, { value: 10, label: '10'}
        ];

        return (
            <tr>
                <td>Разряды числа</td>
                <td>
                    <Select
                        options={options}
                        value={this.state.ns}
                        onChange={this.handleOptionsNumberSizeChange}
                        className="fs-select"
                    />
                </td>
            </tr>
        )
    };
    handleOptionsNumberSizeChange = (ns) => {
        this.setState({ ns });
    };

    getOptionsImpulse = () => {
        const options = [
            { value: 1, label: '1'}, { value: 2, label: '2'}, { value: 3, label: '3'}, { value: 4, label: '4'}, { value: 5, label: '5'},
            { value: 6, label: '6'}, { value: 7, label: '7'}, { value: 8, label: '8'}, { value: 9, label: '9'}, { value: 10, label: '10'}
        ];

        return (
            <tr>
                <td>Показы</td>
                <td>
                    <Select
                        options={options}
                        value={this.state.i}
                        onChange={this.handleOptionsImpulseChange}
                        className="fs-select"
                    />
                </td>
            </tr>
        )
    };
    handleOptionsImpulseChange = (i) => {
        this.setState({ i });
    };

    getOptionsTasks = () => {
        const options = [
            { value: 0, label: 'Неограничено'},
            { value: 1, label: '1'}, { value: 2, label: '2'}, { value: 3, label: '3'}, { value: 4, label: '4'}, { value: 5, label: '5'},
            { value: 6, label: '6'}, { value: 7, label: '7'}, { value: 8, label: '8'}, { value: 9, label: '9'}, { value: 10, label: '10'}
        ];

        let value = this.state.t.value === 0 ? {value: 0, label: 'Неограничено'} : this.state.t;

        return (
            <tr>
                <td>Заданий</td>
                <td>
                    <Select
                        options={options}
                        value={value}
                        onChange={this.handleOptionsTasksChange}
                        className="fs-select custom-select-upwards"
                    />
                </td>
            </tr>
        )
    };
    handleOptionsTasksChange = (t) => {
        this.setState({ t });
    };

    getOptionsSpeed = () => {
        const options = [
            { value: 0.1, label: '0.1 сек'}, { value: 0.2, label: '0.2 сек'}, { value: 0.3, label: '0.3 сек'}, { value: 0.4, label: '0.4 сек'},
            { value: 0.5, label: '0.5 сек'}, { value: 0.7, label: '0.7 сек'}, { value: 1, label: '1 сек'}, { value: 1.2, label: '1.2 сек'},
            { value: 1.5, label: '1.5 сек'}, { value: 1.8, label: '1.8 сек'}, { value: 2, label: '2 сек'}, { value: 2.5, label: '2.5 сек'},
            { value: 3, label: '3 сек'}, { value: 3.5, label: '3.5 сек'}, { value: 4, label: '4 сек'}, { value: 5, label: '5 сек'},
            { value: 7, label: '7 сек'}, { value: 10, label: '10 сек'},
        ];

        return (
            <tr>
                <td>Скорость</td>
                <td>
                    <Select
                        options={options}
                        value={this.state.s}
                        onChange={this.handleOptionsSpeedChange}
                        className="fs-select"
                    />
                </td>
            </tr>
        )
    };
    handleOptionsSpeedChange = (s) => {
        this.setState({ s });
    };

    getOptionsNumberProgress = () => {
        return (
            <tr>
                <td>Прогресс разрядов</td>
                <td>
                    <div className="settings-checkbox">
                        <span
                            className={`settings-checkbox-yes ${this.state.pns?'settings-checkbox-selected':''}`}
                            onClick={() => this.handleBooleanChange('pns', true)}
                        >Да</span>
                        <span
                            className={`settings-checkbox-no ${this.state.pns?'':'settings-checkbox-selected'}`}
                            onClick={() => this.handleBooleanChange('pns', false)}
                        >Нет</span>
                    </div>
                </td>
            </tr>
        )
    };

    getOptionsImpulseProgress = () => {
        return (
            <tr>
                <td>Прогресс показов</td>
                <td>
                    <div className="settings-checkbox">
                        <span
                            className={`settings-checkbox-yes ${this.state.pi?'settings-checkbox-selected':''}`}
                            onClick={() => this.handleBooleanChange('pi', true)}
                        >Да</span>
                        <span
                            className={`settings-checkbox-no ${this.state.pi?'':'settings-checkbox-selected'}`}
                            onClick={() => this.handleBooleanChange('pi', false)}
                        >Нет</span>
                    </div>
                </td>
            </tr>
        )
    };

    getOptionsSpeedProgress = () => {
        return (
            <tr>
                <td>Прогресс скорости</td>
                <td>
                    <div className="settings-checkbox">
                        <span
                            className={`settings-checkbox-yes ${this.state.ps?'settings-checkbox-selected':''}`}
                            onClick={() => this.handleBooleanChange('ps', true)}
                        >Да</span>
                        <span
                            className={`settings-checkbox-no ${this.state.ps?'':'settings-checkbox-selected'}`}
                            onClick={() => this.handleBooleanChange('ps', false)}
                        >Нет</span>
                    </div>
                </td>
            </tr>
        )
    };

    getNumberWarning = () => {
        if(this.state.showDigitsWarning){
            setTimeout(function () {
                this.setState({showDigitsWarning:false})
            }.bind(this), 5000);

            return (
                <div className="fs-digits-warning">Должны быть выбраны хотя бы 2 цифры!</div>
            );
        }
    };

    handleBooleanChange = (stateName, stateValue) => {
        this.setState({ [stateName]: stateValue})
    };

    handleClickSave = () => {

        let refinedSetting = {
            n: this.state.n,
            ns: this.state.ns.value,
            pns: this.state.pns,
            i: this.state.i.value,
            pi: this.state.pi,
            s: this.state.s.value,
            ps: this.state.ps,
            t: this.state.t.value
        };

        this.props.settingsHandler(refinedSetting);
        // Wormhole to the main screen
        this.props.handler(0);
    }
}

export default FlashScreenSettings;