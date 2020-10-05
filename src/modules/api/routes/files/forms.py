from flask_wtf import FlaskForm
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField


class UploadForm(Form):
    planNbrField = TextField('PlanNbr#:', validators=[validators.required()])
