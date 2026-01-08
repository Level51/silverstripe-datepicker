<?php

namespace Level51\Datepicker;

use SilverStripe\Forms\FormField;
use SilverStripe\View\Requirements;

class DatepickerField extends FormField
{
    public function Field($properties = [])
    {
        Requirements::javascript('level51/silverstripe-datepicker: dist/silverstripeDatepicker.js');
        Requirements::css('level51/silverstripe-datepicker: dist/silverstripe-datepicker.css');

        return parent::Field($properties);
    }

    public function getValue(): mixed
    {
        if (method_exists(parent::class, 'getValue')) {
            return parent::getValue();
        }

        if (method_exists(parent::class, 'Value')) {
            return parent::Value();
        }

        return null;
    }

    public function getPayload()
    {
        return json_encode(
            [
                'id'       => $this->ID(),
                'name'     => $this->getName(),
                'value'    => $this->getValue(),
                'settings' => [
                    // TODO make maintainable
                    'format'             => 'dd.MM',
                    'enable-time-picker' => false,
                    'multi-dates'        => true,
                ],
            ],
        );
    }
}
