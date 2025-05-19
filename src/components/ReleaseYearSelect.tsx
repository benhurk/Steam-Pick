'use client';

import { useState } from 'react';

import preferencesInitialState from '@/consts/preferencesInitialState';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import getYearsArray from '@/functions/utils/getYearsArray';

export default function ReleaseYearSelect() {
    const [selected, setSelected] = useState<number>(
        preferencesInitialState.minReleaseYear
    );

    const years = getYearsArray();

    return (
        <Select
            defaultValue={String(selected)}
            onValueChange={(e) => setSelected(Number(e))}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {years.map((y, i) => (
                    <SelectItem key={y * i} value={String(y)}>
                        {y}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
