// ============================================================
// VYTAL - POPULATION HEALTH DATA MODULE
// Based on REAL data from: Copy of for_white_paper_biomarker 1.xlsx
// 92,444 unique users • 228,932 records • 16 biomarkers
// ============================================================

// ============================
// SECTION 1: DATASET OVERVIEW
// ============================

export const datasetOverview = {
    totalRecords: 228932,
    uniqueUsers: 92444,
    biomarkersTracked: 16,
    statesCovered: 28,
    dateRange: '2025-03-15 to present',
    sourceFile: 'Copy of for_white_paper_biomarker 1.xlsx'
};

// ============================
// SECTION 2: LOINC CODE MAPPING
// ============================

export const loincCodes = {
    '2085-9': { name: 'HDL Cholesterol', unit: 'mg/dL', records: 14999 },
    '2089-1': { name: 'LDL Cholesterol', unit: 'mg/dL', records: 14944 },
    '2093-3': { name: 'Total Cholesterol', unit: 'mg/dL', records: 14997 },
    '2571-8': { name: 'Triglycerides', unit: 'mg/dL', records: 14984 },
    '1558-6': { name: 'Fasting Glucose', unit: 'mg/dL', records: 14999 },
    '4548-4': { name: 'HbA1c', unit: '%', records: 14992 },
    '1742-6': { name: 'ALT', unit: 'U/L', records: 14999 },
    '1920-8': { name: 'AST', unit: 'U/L', records: 14999 },
    '1869-7': { name: 'GGT', unit: 'U/L', records: 14999 },
    '1884-6': { name: 'ALP', unit: 'U/L', records: 14988 },
    '1874-7': { name: 'Creatinine', unit: 'mg/dL', records: 15000 },
    '2324-2': { name: 'GFR', unit: 'mL/min', records: 14988 },
    '2428-1': { name: 'Urea', unit: 'mg/dL', records: 4137 },
    '1751-7': { name: 'Albumin', unit: 'g/dL', records: 14990 },
    '30522-7': { name: 'Hemoglobin', unit: 'g/dL', records: 14997 },
    '10835-7': { name: 'RBC Count', unit: 'million/µL', records: 14920 }
};

// ============================
// SECTION 3: POPULATION BIOMARKER STATISTICS
// ============================

export const biomarkerStatistics = {
    hdl: { mean: 43.01, std: 10.17, min: 0, max: 107.4, p25: 36, p50: 42, p75: 49 },
    ldl: { mean: 111.48, std: 32.88, min: 0, max: 277.6, p25: 89, p50: 110, p75: 132.88 },
    totalCholesterol: { mean: 179.27, std: 40.02, min: 0, max: 548, p25: 152, p50: 177, p75: 203 },
    triglycerides: { mean: 150.50, std: 99.01, min: 0, max: 1328, p25: 89.88, p50: 126, p75: 181 },
    glucose: { mean: 104.59, std: 102.97, min: 0, max: 11800, p25: 85.91, p50: 93.2, p75: 105.56 },
    hba1c: { mean: 5.93, std: 1.32, min: 0, max: 33.32, p25: 5.2, p50: 5.6, p75: 6.1 },
    alt: { mean: 32.83, std: 29.42, min: 0, max: 839.4, p25: 17, p50: 25, p75: 38.7 },
    ast: { mean: 28.77, std: 23.05, min: 0, max: 1599.8, p25: 19.82, p50: 24.37, p75: 31.5 },
    ggt: { mean: 121.60, std: 17.10, min: 0, max: 226, p25: 110.56, p50: 121, p75: 132 },
    alp: { mean: 93.14, std: 21.10, min: 0, max: 196, p25: 78.64, p50: 92.09, p75: 106.78 },
    creatinine: { mean: 0.78, std: 0.21, min: 0, max: 4.32, p25: 0.63, p50: 0.77, p75: 0.9 },
    albumin: { mean: 4.30, std: 0.60, min: 0, max: 47, p25: 4.06, p50: 4.3, p75: 4.52 }
};

// ============================
// SECTION 4: CORRELATION MATRIX (REAL DATA)
// ============================

export const correlationMatrix = {
    hdl_ldl: 0.093,
    hdl_totalChol: 0.230,
    hdl_tg: -0.282,
    hdl_glucose: -0.126,
    hdl_hba1c: -0.096,
    hdl_alt: -0.052,
    hdl_ast: 0.012,
    ldl_totalChol: 0.777,
    ldl_tg: 0.116,
    ldl_glucose: 0.004,
    ldl_hba1c: -0.024,
    totalChol_tg: 0.352,
    tg_glucose: 0.300,
    tg_hba1c: 0.213,
    tg_alt: 0.161,
    tg_ast: 0.181,
    glucose_hba1c: 0.673,
    glucose_alt: 0.081,
    alt_ast: 0.806
};

export const strongestCorrelations = [
    { pair: 'ALT ↔ AST', r: 0.806, interpretation: 'Liver enzymes - both elevated indicates liver stress' },
    { pair: 'LDL ↔ Total Cholesterol', r: 0.777, interpretation: 'LDL is primary component of total cholesterol' },
    { pair: 'Glucose ↔ HbA1c', r: 0.673, interpretation: 'HbA1c reflects 90-day average glucose' },
    { pair: 'Total Chol ↔ Triglycerides', r: 0.352, interpretation: 'Both contribute to cardiovascular risk' },
    { pair: 'Triglycerides ↔ Glucose', r: 0.300, interpretation: 'Metabolic syndrome - insulin resistance' },
    { pair: 'HDL ↔ Triglycerides', r: -0.282, interpretation: 'Inverse relationship - atherogenic dyslipidemia' },
    { pair: 'Triglycerides ↔ HbA1c', r: 0.213, interpretation: 'Metabolic dysfunction pattern' }
];

// ============================
// SECTION 5: RISK DISTRIBUTION
// ============================

export const riskDistribution = {
    hdl: {
        low: { threshold: '<40', count: 5913, percentage: 41.2 },
        borderline: { threshold: '40-60', count: 7571, percentage: 52.8 },
        optimal: { threshold: '>60', count: 855, percentage: 6.0 }
    },
    ldl: {
        optimal: { threshold: '<100', count: 5359, percentage: 37.6 },
        borderline: { threshold: '100-130', count: 4987, percentage: 35.0 },
        elevated: { threshold: '130-160', count: 2860, percentage: 20.0 },
        high: { threshold: '>160', count: 1062, percentage: 7.4 }
    },
    triglycerides: {
        optimal: { threshold: '<150', count: 8546, percentage: 62.9 },
        borderline: { threshold: '150-200', count: 2376, percentage: 17.5 },
        high: { threshold: '>200', count: 2657, percentage: 19.6 }
    },
    glucose: {
        normal: { threshold: '<100', percentage: 66.6 },
        preDiabetic: { threshold: '100-126', percentage: 21.2 },
        diabetic: { threshold: '>126', percentage: 12.3 }
    },
    hba1c: {
        normal: { threshold: '<5.7', percentage: 55.1 },
        preDiabetic: { threshold: '5.7-6.4', percentage: 27.1 },
        diabetic: { threshold: '>6.4', percentage: 17.8 }
    }
};

// ============================
// SECTION 6: AGE-WISE DATA
// ============================

export const ageWiseData = {
    '<25': { users: 7029, hdl: 42.2, ldl: 97.6, tg: 125.6, glucose: 88.7, hba1c: 5.3 },
    '25-35': { users: 26809, hdl: 42.1, ldl: 109.5, tg: 146.5, glucose: 95.8, hba1c: 5.5 },
    '36-45': { users: 26489, hdl: 42.5, ldl: 114.2, tg: 159.4, glucose: 102.7, hba1c: 5.9 },
    '46-55': { users: 16398, hdl: 43.8, ldl: 117.0, tg: 158.4, glucose: 117.7, hba1c: 6.3 },
    '56-65': { users: 9674, hdl: 44.9, ldl: 112.1, tg: 149.4, glucose: 114.5, hba1c: 6.5 },
    '65+': { users: 6121, hdl: 44.8, ldl: 106.9, tg: 136.7, glucose: 109.2, hba1c: 6.4 }
};

// ============================
// SECTION 7: GENDER-WISE DATA
// ============================

export const genderWiseData = {
    male: {
        users: 53827,
        hdl: 40.7,
        ldl: 111.9,
        triglycerides: 166.9,
        glucose: 105.9,
        hba1c: 6.0
    },
    female: {
        users: 38628,
        hdl: 46.4,
        ldl: 110.9,
        triglycerides: 126.4,
        glucose: 103.0,
        hba1c: 5.8
    }
};

// ============================
// SECTION 8: STATE-WISE DATA
// ============================

export const stateWiseData = {
    'MAHARASHTRA': { users: 20436, hdl: 42.7, ldl: 114.5, tg: 141.3, glucose: 102.1, hba1c: 6.0 },
    'UTTAR PRADESH': { users: 13552, hdl: 42.7, ldl: 108.8, tg: 152.9, glucose: 104.0, hba1c: 5.9 },
    'DELHI': { users: 9429, hdl: 42.9, ldl: 110.2, tg: 150.9, glucose: 103.6, hba1c: 6.0 },
    'GUJARAT': { users: 7759, hdl: 44.0, ldl: 115.7, tg: 136.8, glucose: 101.6, hba1c: 5.9 },
    'WEST BENGAL': { users: 5870, hdl: 43.4, ldl: 104.9, tg: 161.3, glucose: 116.7, hba1c: 5.9 },
    'PUNJAB': { users: 4212, hdl: 42.8, ldl: 112.4, tg: 155.2, glucose: 105.8, hba1c: 6.1 },
    'MADHYA PRADESH': { users: 3998, hdl: 43.1, ldl: 110.5, tg: 148.6, glucose: 103.2, hba1c: 5.9 },
    'TELANGANA': { users: 3654, hdl: 43.5, ldl: 111.8, tg: 145.2, glucose: 102.8, hba1c: 5.9 },
    'HARYANA': { users: 3512, hdl: 42.4, ldl: 113.2, tg: 158.4, glucose: 104.5, hba1c: 6.0 },
    'KARNATAKA': { users: 2856, hdl: 44.2, ldl: 109.6, tg: 138.4, glucose: 99.8, hba1c: 5.7 }
};

// ============================
// SECTION 9: KEY FINDINGS
// ============================

export const keyFindings = {
    population: [
        '41.2% of population has low HDL (<40 mg/dL) - major CVD risk',
        'Only 6% have optimal HDL (>60 mg/dL)',
        '45% have abnormal HbA1c (pre-diabetic or diabetic)',
        '27.4% have elevated LDL (>130 mg/dL)',
        '19.6% have high triglycerides (>200 mg/dL)'
    ],
    gender: [
        'Males have 14% lower HDL than females (40.7 vs 46.4)',
        'Males have 32% higher triglycerides (166.9 vs 126.4)',
        'Males show worse overall lipid profile'
    ],
    age: [
        'LDL peaks at 46-55 age group (117.0 mg/dL)',
        'Triglycerides peak at 36-45 (159.4 mg/dL)',
        'HbA1c increases steadily with age (5.3 to 6.5%)',
        'HDL slightly improves with age (42.2 to 44.8)'
    ],
    regional: [
        'Karnataka shows best metabolic health (HbA1c 5.7)',
        'West Bengal has highest TG (161.3) and glucose (116.7)',
        'Punjab has highest HbA1c (6.1%)'
    ],
    correlations: [
        'Strongest: ALT-AST (0.81) - liver function cluster',
        'LDL-Total Cholesterol (0.78) - expected relationship',
        'Glucose-HbA1c (0.67) - validates diagnostic consistency',
        'TG-Glucose (0.30) - metabolic syndrome marker',
        'HDL-TG (-0.28) - atherogenic dyslipidemia pattern'
    ]
};

export default {
    datasetOverview,
    loincCodes,
    biomarkerStatistics,
    correlationMatrix,
    strongestCorrelations,
    riskDistribution,
    ageWiseData,
    genderWiseData,
    stateWiseData,
    keyFindings
};
