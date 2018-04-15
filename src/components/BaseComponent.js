import { PureComponent } from "react";

export default class BaseComponent extends PureComponent {
    _bind(...methods) {
        methods.forEach((method => {
            this[method] = this[method].bind(this);
        }).bind(this));
    }

}