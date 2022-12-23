export default {
    data() {
        return {
            status: 'normal',
            popup: '',
            dispatch: '',
            form: {
                /* example: {
                    value: '',
                    require: true,
                    error: false,
                    type: 'text',
                    errorType: 'require',
                    rule: {
                        maxLength: 100,
                        minLength: 10,
                        maxNumber: 100,
                        minNumber: 100,
                    }
                } */
            },
        };
    },
    methods: {
        send() {
            if (this.validate()) {
                this.status = 'load';
                this.$store.dispatch(this.dispatch, this.getData()).then((r) => {
                    this.status = 'normal';
                    this.close();
                    this.callback(r);
                });
            }
        },
        close() {
            this.$store.commit('popups/close', { name: this.popup });
        },
        getData() {
            const result = {};
            for (const f in this.form) {
                result[f] = this.form[f].value;
            }
            return result;
        },
        validate() {
            let result = true;
            for (const f in this.form) {
                let error = false;
                if (this.form[f].require) {
                    switch (this.form[f].type) {
                    case 'text':
                        if (!this.validateText(this.form[f].value, this.form[f].rule)) {
                            error = true;
                            result = false;
                        }
                        break;
                    case 'check':
                    case 'select':
                        if (!this.form[f].value) {
                            error = true;
                            result = false;
                        }
                        break;
                    default:
                        break;
                    }
                    if (error) {
                        this.setError(f);
                    }
                }
            }
            return result;
        },
        setError(f) {
            if (this.form[f].error) {
                this.form[f].error = false;
                setTimeout(() => {
                    this.form[f].error = true;
                }, 10);
            } else {
                this.form[f].error = true;
            }
        },
        validateText(value, rule) {
            let result = true;
            if (rule === {} || !rule) {
                result = (!(!value || value.toString().length === 0));
            }
            if (typeof rule === 'object' && rule !== {}) {
                if (rule.minLength && value.toString().length < rule.minLength) {
                    result = false;
                }
                if (rule.maxLength && value.toString().length > rule.maxLength) {
                    result = false;
                }
            }
            return result;
        },
        callback(r) { return r; },
    },

};
