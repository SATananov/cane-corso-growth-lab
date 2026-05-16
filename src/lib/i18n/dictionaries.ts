export const dictionaries = {
  en: {
    app: {
      name: "Cane Corso Growth Geometry Lab",
      shortName: "Growth Lab",
      eyebrow: "USG Growth Intelligence",
      labSeal: "USG Lab",
      headline:
        "Check Cane Corso growth with clear geometry, model evidence and safe visual guidance.",
      description:
        "A focused app for orientation, learning and transparent ML methodology around Cane Corso growth. It combines user-friendly checks with project-ready evidence.",
      disclaimer:
        "This tool provides orientation only. It does not prove health status, breed purity, pedigree or official Cane Corso status, and it does not replace professional veterinary advice.",
      educationalMl: "Orientation tool",
    },
    nav: {
      label: "Main navigation",
      languageLabel: "Language",
      home: "Home",
      calculator: "Growth Check",
      data: "Data & References",
      visualReview: "Visual Review",
      experiments: "ML Methodology",
      course: "Project Evidence",
      about: "About",
      descriptions: {
        home: "App overview",
        calculator: "Run a growth orientation check",
        data: "Data sources and feature logic",
        visualReview: "Photo guide and visual geometry workspace",
        experiments: "Models, metrics and visual evidence",
        course: "ML project evidence",
        about: "Scope, safety and technology",
      },
    },
    home: {
      chips: [
        "Coordinate-based growth intelligence",
        "USG-inspired lab interface",
      ],
      steps: ["Input", "Model", "Explain"],
      openCalculator: "Open Growth Check",
      viewFoundation: "View ML Foundation",
      conceptEyebrow: "Growth Coordinate Concept",
      conceptTitle: "Every dog starts as a point.",
      conceptDescription:
        "The first version uses a clear coordinate idea: age creates the horizontal axis, weight forms the vertical signal, and the app explains how the current profile relates to a reference curve.",
      axisAge: "Age",
      axisWeight: "Weight",
      cards: [
        {
          label: "Regression",
          text: "Builds the reference curve and expected weight signal.",
        },
        {
          label: "Classification",
          text: "Turns model evidence into safe educational review zones.",
        },
        {
          label: "Geometry",
          text: "Makes the ML result understandable through points, curves and maps.",
        },
      ],
      foundationEyebrow: "ML Foundation",
      foundationTitle: "The ML methodology stays visible.",
      foundationDescription:
        "Regression, classification, clustering, feature engineering, PCA and MLflow are shown as transparent methodology layers, not hidden black-box claims.",
    },
    pageHeroes: {
      calculator: {
        eyebrow: "Growth Check",
        title: "Build the current growth point.",
        description:
          "Enter a Cane Corso profile and see how the current measurement appears inside the coordinate-based growth model. The result is an orientation signal for learning and owner review, not a diagnosis.",
        badge: "Growth signal",
      },
      data: {
        eyebrow: "Data & References",
        title: "The app shows what data supports the model logic.",
        description:
          "This page explains the reference samples, processed data and engineered features used by the methodology layer. It keeps the app transparent: what is included, how each dataset is used and where the limits are.",
        badge: "Transparent data",
      },
      visualReview: {
        eyebrow: "Visual Review",
        title: "Prepare photos for fair Cane Corso geometry comparison.",
        description:
          "The visual workspace explains which photos are suitable, checks comparison readiness and prepares the future overlay between the Cane Corso reference geometry and the user's uploaded image.",
        badge: "Photo criteria",
      },
      experiments: {
        eyebrow: "ML Methodology",
        title: "The model evidence behind the growth check.",
        description:
          "This page connects the app with the machine learning methods behind it: regression for curves, classification for review zones, clustering for profile groups, PCA for visual maps and MLflow-style tracking for experiment history.",
        badge: "Model evidence",
      },
      course: {
        eyebrow: "Project Evidence",
        title: "Machine learning topics shown in a working app.",
        description:
          "This page keeps the project review layer clear: it maps regression, classification, clustering, feature engineering, dimensionality reduction and MLflow to the app surfaces where they are demonstrated.",
        badge: "Course-ready",
      },
      about: {
        eyebrow: "About the App",
        title: "A focused Cane Corso growth orientation app.",
        description:
          "The app combines a clean product experience with transparent machine learning methodology. It is designed for orientation, learning and future expansion, not official certification or veterinary diagnosis.",
        badge: "Scope & safety",
      },
    },
    calculator: {
      eyebrow: "Growth Orientation",
      title: "Growth check with coordinate feedback.",
      description:
        "Enter a Cane Corso profile and the app places the dog as a point in a growth coordinate system. The result is a review signal for orientation, not a medical conclusion.",
      inputEyebrow: "Dog Profile Input",
      inputTitle: "Build the current growth point",
      livePreview: "Live preview",
      labels: {
        dogName: "Dog name",
        sex: "Sex",
        male: "Male",
        female: "Female",
        ageMonths: "Age months",
        currentWeightKg: "Current weight kg",
        heightCm: "Height cm",
        bodyConditionScore: "Body condition score",
        adultReferenceKg: "Adult reference kg",
      },
      placeholderName: "Example: MARK I",
      bcsHint:
        "Educational scale from 1 to 9. Middle values are calmer signals.",
    },
    prediction: {
      eyebrow: "Growth Signal",
      expectedNow: "Expected now",
      referenceCurvePoint: "Reference curve point",
      difference: "Difference",
      fromReference: "from reference",
      estimatedAdult: "Estimated adult",
      educationalEstimate: "Educational estimate",
      confidence: "Confidence",
      inputCompleteness: "Input completeness signal",
      recommendedNextStep: "Recommended next step",
    },
    formulas: {
      eyebrow: "Formula Logic",
      title: "How the signal is calculated.",
      description:
        "These formulas make the app logic visible: the dog is plotted as a point, compared with a curve and translated into a safe orientation signal.",
      badge: "transparent math",
      tableHeaders: ["Stage", "Formula", "Live value"],
      rows: {
        growthProgress: "Growth progress",
        expectedWeightNow: "Expected weight now",
        curveDelta: "Curve delta",
        estimatedAdultWeight: "Estimated adult weight",
      },
    },
    tables: {
      evaluationEyebrow: "Model Evaluation",
      evaluationTitle:
        "Model results are visible, comparable and connected to the app.",
      evaluationDescription:
        "The tables below make the ML evidence easy to review: regression explains the growth curve, while classification supports the review-zone signal.",
      regressionTitle: "Regression model comparison",
      regressionDescription:
        "Lower MAE/RMSE and higher R² are better for this growth-curve experiment.",
      classificationTitle: "Classification model comparison",
      classificationDescription:
        "F1 and AUC help compare the educational review-zone signal without calling it a diagnosis.",
      regressionHeaders: [
        "Model",
        "Geometry",
        "Features",
        "MAE",
        "RMSE",
        "R²",
        "App role",
      ],
      classificationHeaders: [
        "Model",
        "Geometry",
        "Accuracy",
        "Precision",
        "Recall",
        "F1",
        "AUC",
        "App role",
      ],
      selectedBridgeEvidence: "Selected bridge evidence",
      comparisonBaseline: "Comparison baseline",
      bestCurrentSignal: "Best current signal evidence",
      boundaryComparison: "Boundary comparison",
      featureFormulaEyebrow: "Feature Logic",
      featureFormulaTitle:
        "Owner inputs are converted into model-ready signals.",
      featureFormulaDescription:
        "This table makes the data logic explicit. The app does not hide the transformation between user inputs and the model feature vector.",
      featureHeaders: ["Feature", "Formula", "Purpose"],
      derivedAppFeature: "derived feature",
    },
    evidence: {
      eyebrow: "Final Evidence Matrix",
      title: "Visual clarity plus logical proof.",
      stats: {
        formulas: "Formulas",
        evidence: "Evidence",
        topics: "Topics",
      },
      headers: ["Area", "App surface", "Evidence", "Why it matters"],
    },
    visualReview: {
      guide: {
        eyebrow: "Photo guide",
        title: "The model should only compare photos that match the criteria.",
        description:
          "Before a future neural model or visual match score is allowed, the app must know whether the photo is suitable. The guide defines what the user should upload and what the model should reject or mark as limited.",
      },
      criteria: {
        title: "Comparison criteria",
      },
      workspace: {
        uploadEyebrow: "User photo",
        uploadTitle: "Upload a photo for readiness preview",
        uploadDescription:
          "This first version previews the photo and shows the comparison-readiness states. It prepares the UI for a future ML photo-quality gate.",
        dropTitle: "Upload dog photo",
        dropDescription:
          "Use a clear side-body photo first. Later versions will validate the image automatically before comparison.",
        readinessTitle: "Photo readiness",
        emptyState: {
          label: "Waiting",
          title: "No photo uploaded yet.",
          description:
            "Upload a photo to preview how the future photo-quality gate will guide the comparison workflow.",
        },
        readiness: {
          accepted: {
            label: "Accepted",
            title: "The photo is suitable for comparison.",
            description:
              "The image follows the criteria closely enough for a visual geometry comparison workspace.",
          },
          limited: {
            label: "Limited",
            title: "The photo may support only partial comparison.",
            description:
              "The image can be previewed, but a future model should warn that the result may be less reliable.",
          },
          rejected: {
            label: "Rejected",
            title: "The photo does not meet the comparison criteria.",
            description:
              "Upload a new image: full dog, correct angle, natural stance, clear light and minimal perspective distortion.",
          },
        },
      },
      overlay: {
        eyebrow: "Overlay concept",
        title: "Reference geometry plus user-photo geometry.",
        description:
          "The future comparison should not simply place one photo over another. It should compare the user's extracted geometry with the Cane Corso reference geometry, then explain the visible differences.",
      },
      workflow: {
        eyebrow: "Visual ML workflow",
        title: "The photo gate comes before the match score.",
        safety:
          "The future score must be shown as visual similarity only. It cannot prove pedigree, breed purity, official status or health status from an image.",
      },
      readinessTable: {
        eyebrow: "Readiness levels",
        title: "Warnings keep the visual model honest.",
        headers: ["Level", "Score range", "Meaning", "App action"],
      },
    },
    about: {
      technology: "Technology Direction",
      boundaries: "Product Boundaries",
      importantNote: "Important note",
      stack: [
        "Next.js App Router",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Python notebooks",
        "scikit-learn foundation",
      ],
      productBoundaries: [
        "No veterinary diagnosis claims",
        "No real owner account system yet",
        "No database in the first version",
        "No external ML API in the first version",
        "Educational growth orientation only",
      ],
    },
  },
  bg: {
    app: {
      name: "Cane Corso Лаборатория за Геометрия на Растежа",
      shortName: "Growth Lab",
      eyebrow: "USG ML лаборатория за растеж",
      labSeal: "USG Lab",
      headline:
        "Провери растежа на Cane Corso чрез ясна геометрия, модели и безопасна ориентация.",
      description:
        "Фокусирано приложение за ориентация, обучение и прозрачна ML методология около растежа на Cane Corso. Комбинира удобна проверка с доказуема проектна логика.",
      disclaimer:
        "Този проект е образователен експеримент с машинно обучение. Не е ветеринарна диагностична система и не замества професионален ветеринарен съвет.",
      educationalMl: "Ориентировъчен инструмент",
    },
    nav: {
      label: "Основна навигация",
      languageLabel: "Език",
      home: "Начало",
      calculator: "Проверка на растежа",
      data: "Данни и еталони",
      visualReview: "Визуален преглед",
      experiments: "ML методология",
      course: "Проектни доказателства",
      about: "За приложението",
      descriptions: {
        home: "Преглед на приложението",
        calculator: "Ориентировъчна проверка на растежа",
        data: "Данни, еталони и feature логика",
        visualReview: "Фото указания и геометрично сравнение",
        experiments: "Модели, метрики и визуални доказателства",
        course: "Доказателства за ML проекта",
        about: "Обхват, безопасност и технология",
      },
    },
    home: {
      chips: ["Координатна логика за растеж", "USG-inspired лабораторен интерфейс"],
      steps: ["Въвеждане", "Модел", "Обяснение"],
      openCalculator: "Отвори проверката",
      viewFoundation: "Виж ML основата",
      conceptEyebrow: "Координатна идея за растеж",
      conceptTitle: "Всяко куче започва като точка.",
      conceptDescription:
        "Първата версия използва ясна координатна идея: възрастта е хоризонталната ос, теглото е вертикалният сигнал, а приложението обяснява как текущият профил се отнася към референтна крива.",
      axisAge: "Възраст",
      axisWeight: "Тегло",
      cards: [
        {
          label: "Regression",
          text: "Изгражда референтната крива и очаквания сигнал за тегло.",
        },
        {
          label: "Classification",
          text: "Превръща ML доказателствата в безопасни образователни зони за преглед.",
        },
        {
          label: "Geometry",
          text: "Прави резултата разбираем чрез точки, криви и карти.",
        },
      ],
      foundationEyebrow: "ML основа",
      foundationTitle: "ML методологията остава видима.",
      foundationDescription:
        "Regression, Classification, Clustering, Feature Engineering, PCA и MLflow са представени като прозрачни методологични слоеве, а не като скрити black-box твърдения.",
    },
    pageHeroes: {
      calculator: {
        eyebrow: "Проверка на растежа",
        title: "Изгради текущата точка на растеж.",
        description:
          "Въведи профил на Cane Corso и виж как текущото измерване попада в координатния модел на растеж. Резултатът е ориентировъчен сигнал за преглед, не диагноза.",
        badge: "Сигнал за растеж",
      },
      data: {
        eyebrow: "Данни и еталони",
        title: "Приложението показва какви данни подкрепят моделите.",
        description:
          "Тази страница обяснява референтните извадки, обработените данни и създадените features, използвани от методологичния слой. Целта е прозрачност: какво е включено, за какво се използва и къде са ограниченията.",
        badge: "Прозрачни данни",
      },
      visualReview: {
        eyebrow: "Визуален преглед",
        title: "Подготви снимки за коректно геометрично сравнение.",
        description:
          "Визуалният модул обяснява какви снимки са подходящи, проверява готовността за сравнение и подготвя бъдещ overlay между Cane Corso еталонната геометрия и качената снимка.",
        badge: "Фото критерии",
      },
      experiments: {
        eyebrow: "ML методология",
        title: "Моделните доказателства зад проверката на растежа.",
        description:
          "Тази страница свързва приложението с методите зад него: Regression за криви, Classification за зони за преглед, Clustering за профилни групи, PCA за визуални карти и MLflow-style tracking за история на експериментите.",
        badge: "Моделни доказателства",
      },
      course: {
        eyebrow: "Проектни доказателства",
        title: "ML темите са показани в работещо приложение.",
        description:
          "Тази страница държи проектната част ясна: показва как Regression, Classification, Clustering, Feature Engineering, Dimensionality Reduction и MLflow се демонстрират в приложението.",
        badge: "Готово за курс",
      },
      about: {
        eyebrow: "За приложението",
        title: "Фокусирано приложение за ориентация при растежа на Cane Corso.",
        description:
          "Приложението комбинира чисто потребителско изживяване с прозрачна методология по машинно обучение. То е за ориентация, обучение и бъдещо развитие, не за официална сертификация или ветеринарна диагноза.",
        badge: "Обхват и безопасност",
      },
    },
    calculator: {
      eyebrow: "Ориентация за растеж",
      title: "Проверка на растежа с координатна обратна връзка.",
      description:
        "Въведи профил на Cane Corso и приложението поставя кучето като точка в координатна система на растежа. Резултатът е ориентировъчен сигнал, не медицинско заключение.",
      inputEyebrow: "Въвеждане на профил",
      inputTitle: "Изгради текущата точка на растеж",
      livePreview: "Жив преглед",
      labels: {
        dogName: "Име на кучето",
        sex: "Пол",
        male: "Мъжко",
        female: "Женско",
        ageMonths: "Възраст в месеци",
        currentWeightKg: "Текущо тегло kg",
        heightCm: "Височина cm",
        bodyConditionScore: "Body condition score",
        adultReferenceKg: "Референтно тегло като възрастен kg",
      },
      placeholderName: "Пример: MARK I",
      bcsHint:
        "Образователна скала от 1 до 9. Средните стойности дават по-спокоен сигнал.",
    },
    prediction: {
      eyebrow: "Сигнал за растеж",
      expectedNow: "Очаквано сега",
      referenceCurvePoint: "Точка от референтната крива",
      difference: "Разлика",
      fromReference: "от референцията",
      estimatedAdult: "Оценка като възрастен",
      educationalEstimate: "Образователна оценка",
      confidence: "Увереност",
      inputCompleteness: "Сигнал за пълнота на входа",
      recommendedNextStep: "Препоръчана следваща стъпка",
    },
    formulas: {
      eyebrow: "Formula Logic",
      title: "Как се изчислява сигналът.",
      description:
        "Тези формули правят логиката видима: кучето се поставя като точка, сравнява се с крива и се превежда в безопасен образователен growth сигнал.",
      badge: "прозрачна математика",
      tableHeaders: ["Стъпка", "Формула", "Жива стойност"],
      rows: {
        growthProgress: "Прогрес на растежа",
        expectedWeightNow: "Очаквано тегло сега",
        curveDelta: "Разлика от кривата",
        estimatedAdultWeight: "Оценка като възрастен",
      },
    },
    tables: {
      evaluationEyebrow: "Model Evaluation",
      evaluationTitle:
        "Резултатите от моделите са видими, сравними и свързани с приложението.",
      evaluationDescription:
        "Таблиците по-долу правят ML evidence по-лесен за преглед: regression обяснява кривата на растежа, а classification подкрепя образователния review-zone сигнал.",
      regressionTitle: "Сравнение на regression модели",
      regressionDescription:
        "По-ниски MAE/RMSE и по-високо R² са по-добри за този growth-curve експеримент.",
      classificationTitle: "Сравнение на classification модели",
      classificationDescription:
        "F1 и AUC помагат да сравним образователния review-zone сигнал, без да го наричаме диагноза.",
      regressionHeaders: ["Модел", "Геометрия", "Features", "MAE", "RMSE", "R²", "Роля в приложението"],
      classificationHeaders: [
        "Модел",
        "Геометрия",
        "Accuracy",
        "Precision",
        "Recall",
        "F1",
        "AUC",
        "Роля в приложението",
      ],
      selectedBridgeEvidence: "Избрано bridge evidence",
      comparisonBaseline: "Базов модел за сравнение",
      bestCurrentSignal: "Най-добро текущо signal evidence",
      boundaryComparison: "Сравнение на граници",
      featureFormulaEyebrow: "Feature Logic",
      featureFormulaTitle:
        "Въведените данни се превръщат в сигнали, готови за модел.",
      featureFormulaDescription:
        "Тази таблица прави data логиката ясна. App-ът не скрива трансформацията между owner-friendly входа и ML-style feature vector-а.",
      featureHeaders: ["Feature", "Формула", "Цел"],
      derivedAppFeature: "derived feature",
    },
    evidence: {
      eyebrow: "Финална матрица с доказателства",
      title: "Визуална яснота плюс логическо доказателство.",
      stats: {
        formulas: "Формули",
        evidence: "Evidence",
        topics: "Теми",
      },
      headers: ["Област", "App повърхност", "Evidence", "Защо е важно"],
    },
    visualReview: {
      guide: {
        eyebrow: "Фото указания",
        title: "Моделът трябва да сравнява само снимки, които покриват критериите.",
        description:
          "Преди бъдещ невронен модел или visual match score да бъде разрешен, приложението трябва да знае дали снимката е подходяща. Указанията определят какво трябва да качи потребителят и какво моделът трябва да отхвърли или маркира като ограничено.",
      },
      criteria: {
        title: "Критерии за сравнение",
      },
      workspace: {
        uploadEyebrow: "Снимка на потребителя",
        uploadTitle: "Качи снимка за preview на готовността",
        uploadDescription:
          "Тази първа версия показва снимката и състоянията за готовност за сравнение. Така подготвяме UI слоя за бъдещ ML photo-quality gate.",
        dropTitle: "Качи снимка на Cane-то",
        dropDescription:
          "Първо използвай ясна странична снимка на цялото тяло. Следващите версии ще валидират изображението автоматично преди сравнение.",
        readinessTitle: "Готовност на снимката",
        emptyState: {
          label: "Изчакване",
          title: "Още няма качена снимка.",
          description:
            "Качи снимка, за да видиш как бъдещият photo-quality gate ще води процеса на сравнение.",
        },
        readiness: {
          accepted: {
            label: "Подходяща",
            title: "Снимката е подходяща за сравнение.",
            description:
              "Изображението покрива критериите достатъчно добре за визуално геометрично сравнение.",
          },
          limited: {
            label: "Ограничена",
            title: "Снимката позволява само частично сравнение.",
            description:
              "Снимката може да се прегледа, но бъдещият модел трябва да предупреди, че резултатът може да е по-малко надежден.",
          },
          rejected: {
            label: "Неподходяща",
            title: "Снимката не отговаря на критериите за сравнение.",
            description:
              "Качи нова снимка: цяло куче, правилен ъгъл, естествена стойка, добра светлина и минимално перспективно изкривяване.",
          },
        },
      },
      overlay: {
        eyebrow: "Overlay концепция",
        title: "Еталонна геометрия плюс геометрия от снимката.",
        description:
          "Бъдещото сравнение не трябва просто да налага снимка върху снимка. То трябва да сравнява извлечената геометрия от потребителската снимка с Cane Corso еталонната геометрия и да обяснява видимите разлики.",
      },
      workflow: {
        eyebrow: "Visual ML процес",
        title: "Photo gate идва преди match score.",
        safety:
          "Бъдещият резултат трябва да се показва само като визуално сходство. Той не може да доказва родословие, породна чистота, официален статус или здравословно състояние по снимка.",
      },
      readinessTable: {
        eyebrow: "Нива на готовност",
        title: "Предупрежденията пазят визуалния модел честен.",
        headers: ["Ниво", "Диапазон", "Значение", "Действие в app-а"],
      },
    },
    about: {
      technology: "Технологична посока",
      boundaries: "Продуктови граници",
      importantNote: "Важна бележка",
      stack: [
        "Next.js App Router",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Python notebooks",
        "scikit-learn основа",
      ],
      productBoundaries: [
        "Без ветеринарни диагностични твърдения",
        "Без реална owner account система в първата версия",
        "Без база данни в първата версия",
        "Без външен ML API в първата версия",
        "Само образователна ориентация за растеж",
      ],
    },
  },
  it: {
    app: {
      name: "Laboratorio di Geometria della Crescita Cane Corso",
      shortName: "Growth Lab",
      eyebrow: "USG laboratorio crescita",
      labSeal: "USG Lab",
      headline:
        "Controlla la crescita del Cane Corso con geometria chiara, evidenze del modello e orientamento sicuro.",
      description:
        "Un'app sperimentale separata per esplorare i pattern di crescita del Cane Corso con regressione, classificazione, clustering e logica geometrica visuale.",
      disclaimer:
        "Questo strumento offre solo orientamento. Non dimostra stato di salute, purezza di razza, pedigree o status ufficiale Cane Corso e non sostituisce il parere veterinario professionale.",
      educationalMl: "Strumento orientativo",
    },
    nav: {
      label: "Navigazione principale",
      languageLabel: "Lingua",
      home: "Home",
      calculator: "Controllo crescita",
      data: "Dati e riferimenti",
      visualReview: "Revisione visuale",
      experiments: "Metodologia ML",
      course: "Evidenze progetto",
      about: "Informazioni",
      descriptions: {
        home: "Panoramica dell’app",
        calculator: "Controllo orientativo della crescita",
        data: "Fonti dati e logica delle feature",
        visualReview: "Guida foto e spazio di confronto geometrico",
        experiments: "Modelli, metriche ed evidenze visuali",
        course: "Evidenze del progetto ML",
        about: "Ambito, sicurezza e tecnologia",
      },
    },
    home: {
      chips: ["Intelligenza della crescita basata su coordinate", "Interfaccia lab ispirata a USG"],
      steps: ["Input", "Modello", "Spiegazione"],
      openCalculator: "Apri il controllo crescita",
      viewFoundation: "Vedi la base ML",
      conceptEyebrow: "Concetto di coordinate di crescita",
      conceptTitle: "Ogni cane inizia come un punto.",
      conceptDescription:
        "La prima versione usa un'idea geometrica chiara: l'età crea l'asse orizzontale, il peso forma il segnale verticale e l'app spiega come il profilo attuale si relaziona a una curva di riferimento.",
      axisAge: "Età",
      axisWeight: "Peso",
      cards: [
        {
          label: "Regression",
          text: "Costruisce la curva di riferimento e il segnale di peso atteso.",
        },
        {
          label: "Classification",
          text: "Trasforma le evidenze ML in zone educative di revisione sicure.",
        },
        {
          label: "Geometry",
          text: "Rende comprensibile il risultato con punti, curve e mappe.",
        },
      ],
      foundationEyebrow: "Base ML",
      foundationTitle: "La metodologia ML resta visibile.",
      foundationDescription:
        "Regression, Classification, Clustering, Feature Engineering, PCA e MLflow sono presentati come livelli metodologici trasparenti, non come affermazioni black-box nascoste.",
    },
    pageHeroes: {
      calculator: {
        eyebrow: "Controllo crescita",
        title: "Costruisci il punto di crescita attuale.",
        description:
          "Inserisci un profilo Cane Corso e guarda come la misurazione attuale appare nel modello di crescita basato su coordinate. Il risultato è un segnale orientativo per revisione, non una diagnosi.",
        badge: "Segnale crescita",
      },
      data: {
        eyebrow: "Dati e riferimenti",
        title: "L’app mostra quali dati supportano la logica del modello.",
        description:
          "Questa pagina spiega i campioni di riferimento, i dati elaborati e le feature create dal livello metodologico. Mantiene l’app trasparente: cosa è incluso, come viene usato e dove sono i limiti.",
        badge: "Dati trasparenti",
      },
      visualReview: {
        eyebrow: "Revisione visuale",
        title: "Prepara foto adatte per un confronto geometrico corretto.",
        description:
          "Lo spazio visuale spiega quali foto sono adatte, controlla la prontezza al confronto e prepara il futuro overlay tra la geometria Cane Corso di riferimento e l’immagine caricata dall’utente.",
        badge: "Criteri foto",
      },
      experiments: {
        eyebrow: "Metodologia ML",
        title: "Le evidenze del modello dietro il controllo crescita.",
        description:
          "Questa pagina collega l’app ai metodi dietro il risultato: Regression per le curve, Classification per le zone di revisione, Clustering per i gruppi di profilo, PCA per le mappe visuali e tracking stile MLflow per la storia degli esperimenti.",
        badge: "Evidenze modello",
      },
      course: {
        eyebrow: "Evidenze progetto",
        title: "I temi ML sono dimostrati in un’app funzionante.",
        description:
          "Questa pagina mantiene chiaro il livello di revisione del progetto: mostra come Regression, Classification, Clustering, Feature Engineering, Dimensionality Reduction e MLflow vengono dimostrati nelle superfici dell’app.",
        badge: "Готово за курс",
      },
      about: {
        eyebrow: "Informazioni sull’app",
        title: "Un’app focalizzata sull’orientamento della crescita del Cane Corso.",
        description:
          "L’app combina un’esperienza pulita con una metodologia ML trasparente. È pensata per orientamento, apprendimento ed evoluzione futura, non per certificazione ufficiale o diagnosi veterinaria.",
        badge: "Ambito e sicurezza",
      },
    },
    calculator: {
      eyebrow: "Orientamento crescita",
      title: "Controllo crescita con feedback a coordinate.",
      description:
        "Inserisci un profilo Cane Corso e l’app posiziona il cane come punto in un sistema di coordinate della crescita. Il risultato è un segnale orientativo, non una conclusione medica.",
      inputEyebrow: "Input profilo cane",
      inputTitle: "Costruisci il punto di crescita attuale",
      livePreview: "Anteprima live",
      labels: {
        dogName: "Nome del cane",
        sex: "Sesso",
        male: "Maschio",
        female: "Femmina",
        ageMonths: "Età in mesi",
        currentWeightKg: "Peso attuale kg",
        heightCm: "Altezza cm",
        bodyConditionScore: "Body condition score",
        adultReferenceKg: "Peso adulto di riferimento kg",
      },
      placeholderName: "Esempio: MARK I",
      bcsHint:
        "Scala educativa da 1 a 9. I valori centrali producono segnali più calmi.",
    },
    prediction: {
      eyebrow: "Pannello previsione",
      expectedNow: "Atteso ora",
      referenceCurvePoint: "Punto della curva di riferimento",
      difference: "Differenza",
      fromReference: "dal riferimento",
      estimatedAdult: "Stima da adulto",
      educationalEstimate: "Stima educativa",
      confidence: "Confidenza",
      inputCompleteness: "Segnale di completezza input",
      recommendedNextStep: "Prossimo passo consigliato",
    },
    formulas: {
      eyebrow: "Evidenza delle formule",
      title: "Come viene calcolato il segnale.",
      description:
        "Queste formule rendono visibile la logica dell’app: il cane viene posizionato come punto, confrontato con una curva e tradotto in un segnale orientativo sicuro.",
      badge: "matematica trasparente",
      tableHeaders: ["Passo", "Formula", "Valore live"],
      rows: {
        growthProgress: "Progresso crescita",
        expectedWeightNow: "Peso atteso ora",
        curveDelta: "Delta dalla curva",
        estimatedAdultWeight: "Stima peso adulto",
      },
    },
    tables: {
      evaluationEyebrow: "Model Evaluation",
      evaluationTitle:
        "I risultati dei modelli sono visibili, confrontabili e collegati all'app.",
      evaluationDescription:
        "Le tabelle sotto rendono le evidenze ML più facili da revisionare: Regression spiega la curva di crescita, mentre Classification supporta il segnale della zona di revisione.",
      regressionTitle: "Confronto modelli regression",
      regressionDescription:
        "MAE/RMSE più bassi e R² più alto sono migliori per questo esperimento di curva di crescita.",
      classificationTitle: "Confronto modelli classification",
      classificationDescription:
        "F1 e AUC aiutano a confrontare il segnale della zona di revisione senza chiamarlo diagnosi.",
      regressionHeaders: ["Modello", "Geometria", "Features", "MAE", "RMSE", "R²", "Ruolo app"],
      classificationHeaders: [
        "Modello",
        "Geometria",
        "Accuracy",
        "Precision",
        "Recall",
        "F1",
        "AUC",
        "Ruolo app",
      ],
      selectedBridgeEvidence: "Evidenza bridge selezionata",
      comparisonBaseline: "Baseline di confronto",
      bestCurrentSignal: "Migliore evidenza segnale attuale",
      boundaryComparison: "Confronto dei confini",
      featureFormulaEyebrow: "Feature Logic",
      featureFormulaTitle:
        "Gli input dell’utente vengono convertiti in segnali pronti per il modello.",
      featureFormulaDescription:
        "Questa tabella rende esplicita la logica dei dati. L’app non nasconde la trasformazione tra input dell’utente e feature vector del modello.",
      featureHeaders: ["Feature", "Formula", "Scopo"],
      derivedAppFeature: "feature derivata",
    },
    evidence: {
      eyebrow: "Matrice finale delle evidenze",
      title: "Chiarezza visuale più prova logica.",
      stats: {
        formulas: "Formule",
        evidence: "Evidenze",
        topics: "Temi",
      },
      headers: ["Area", "Superficie app", "Evidenza", "Perché conta"],
    },
    visualReview: {
      guide: {
        eyebrow: "Guida foto",
        title: "Il modello deve confrontare solo foto che rispettano i criteri.",
        description:
          "Prima di autorizzare un futuro modello neurale o un visual match score, l’app deve sapere se la foto è adatta. La guida definisce cosa caricare e cosa il modello deve rifiutare o marcare come limitato.",
      },
      criteria: {
        title: "Criteri di confronto",
      },
      workspace: {
        uploadEyebrow: "Foto utente",
        uploadTitle: "Carica una foto per la preview di prontezza",
        uploadDescription:
          "Questa prima versione mostra la foto e gli stati di prontezza al confronto. Prepara il livello UI per un futuro ML photo-quality gate.",
        dropTitle: "Carica foto del cane",
        dropDescription:
          "Usa prima una foto laterale chiara del corpo intero. Le versioni successive valideranno automaticamente l’immagine prima del confronto.",
        readinessTitle: "Prontezza foto",
        emptyState: {
          label: "In attesa",
          title: "Nessuna foto caricata.",
          description:
            "Carica una foto per vedere come il futuro photo-quality gate guiderà il processo di confronto.",
        },
        readiness: {
          accepted: {
            label: "Accettata",
            title: "La foto è adatta al confronto.",
            description:
              "L’immagine segue i criteri abbastanza bene per uno spazio di confronto geometrico visuale.",
          },
          limited: {
            label: "Limitata",
            title: "La foto può supportare solo un confronto parziale.",
            description:
              "L’immagine può essere visualizzata, ma un futuro modello dovrebbe avvisare che il risultato può essere meno affidabile.",
          },
          rejected: {
            label: "Non adatta",
            title: "La foto non soddisfa i criteri di confronto.",
            description:
              "Carica una nuova immagine: cane intero, angolo corretto, postura naturale, buona luce e minima distorsione prospettica.",
          },
        },
      },
      overlay: {
        eyebrow: "Concetto overlay",
        title: "Geometria di riferimento più geometria della foto utente.",
        description:
          "Il confronto futuro non deve semplicemente sovrapporre una foto all’altra. Deve confrontare la geometria estratta dalla foto utente con la geometria Cane Corso di riferimento e spiegare le differenze visibili.",
      },
      workflow: {
        eyebrow: "Workflow visual ML",
        title: "Il photo gate viene prima del match score.",
        safety:
          "Il risultato futuro deve essere mostrato solo come somiglianza visuale. Non può provare pedigree, purezza di razza, status ufficiale o stato di salute da un’immagine.",
      },
      readinessTable: {
        eyebrow: "Livelli di prontezza",
        title: "Gli avvisi mantengono onesto il modello visuale.",
        headers: ["Livello", "Intervallo", "Significato", "Azione app"],
      },
    },
    about: {
      technology: "Direzione tecnologica",
      boundaries: "Confini del prodotto",
      importantNote: "Nota importante",
      stack: [
        "Next.js App Router",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Python notebooks",
        "base scikit-learn",
      ],
      productBoundaries: [
        "Nessuna affermazione diagnostica veterinaria",
        "Nessun sistema reale di account proprietario nella prima versione",
        "Nessun database nella prima versione",
        "Nessuna API ML esterna nella prima versione",
        "Solo orientamento sulla crescita",
      ],
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[keyof typeof dictionaries];
export type PageHeroKey = keyof (typeof dictionaries)["en"]["pageHeroes"];
