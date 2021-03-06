"use strict";

const gulp = require("gulp");
const { watch, series } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
// const sourcemaps = require('gulp-sourcemaps');
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const image = require("gulp-image");
const uglify = require("gulp-uglify-es").default;
const isChanged = require("gulp-changed");

const fileinclude = require("gulp-file-include");
const server = require("browser-sync").create();
const changed = require("gulp-changed");

const paths = {
  scripts: {
    src: "./",
    dest: "./build/",
  },
};

// Copy needed files
async function CopyFiles() {
  gulp
    .src([
      "src/**/*.*",
      // '!src/js/script.js',
      "!src/scss/**/*.*",
    ])
    .pipe(isChanged("build/assets/"))
    .pipe(gulp.dest("build/assets/"));
}

// Main styles function
async function styles(source, newfile) {
  return (
    gulp
      .src(source)
      // .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(autoprefixer())
      // .pipe(sourcemaps.write())
      .pipe(rename(newfile))
      .pipe(gulp.dest("build/assets/css"))
      .pipe(server.stream())
  );
}

// Minification of images
async function imageMin() {
  gulp
    .src("src/img/*/*.*")
    .pipe(
      image({
        optipng: ["-i 1", "-strip all", "-fix", "-o7", "-force"],
        pngquant: ["--speed=1", "--force", 256],
        zopflipng: ["-y", "--lossy_8bit", "--lossy_transparent"],
        jpegRecompress: [
          "--strip",
          "--quality",
          "medium",
          "--min",
          40,
          "--max",
          80,
        ],
        mozjpeg: ["-optimize", "-progressive"],
        gifsicle: ["--optimize"],
        svgo: ["--enable", "cleanupIDs", "--disable", "convertColors"],
      })
    )
    .pipe(changed("src/img/*/*.*"))
    .pipe(gulp.dest("build/assets/img"));
}

// Uglify scripts
async function scripts() {
  gulp
    .src("src/js/script.js")
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/assets/js"))
    .pipe(server.stream());
}

// Reload Server
async function reload() {
  server.reload();
}

// Build files html and reload server
async function buildAndReload() {
  await includeHTML();
  CopyFiles();
  styles("src/scss/style.scss", "main.css");
  // styles('src/scss/style.rtl.scss', 'main.rtl.css');
  // imageMin();
  // scripts();
  reload();
}

async function includeHTML() {
  return gulp
    .src([
      "./*.html",
      "./views/**/*.html",
      "!./views/includes/**/*.*", // ignore
    ])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
        context: {
          slider: [
            {
              symbol: "",
              img: "1.jpg",
              title: "صمم موقعك اليوم",
              desc: "من خالل مدونة طبية خاصة لعملائك يتمكن فريق العمل الطبي من نشر محتوى طبي تثقيفي بأسلوب شيق جذاب",
            },
            {
              symbol: "",
              img: "1.jpg",
              title: "موقع للمستقبل",
              desc: "اعين شريكنا ابتدي دائما على المستقبل لذلك نحرص عىل تصميم موقع الكتروني جاهز للتحديثات المستقبلية والتطورات الحديثة",
            },
            {
              symbol: "",
              img: "1.jpg",
              title: "إبتكار العلامة التجاريةروض مناسبة",
              desc: "تعد العلامة التجارية وهوية الشركة أهم الخطوات لبدء وتأسيس عملك. سنقوم بترجمة المبادئ الأساسية لشركتك",
            },
          ],
          about: [
            {
              img: "checkmark.svg",
              title: "شركة رسمية",
              desc: "شركة رسمية مسجلة بسجل تجاري تحرص على حفظ حقوق عملاءها",
            },
            {
              img: "headphones.svg",
              title: "دعم مباشر",
              desc: "نقدم دعم فني حقيقي متواجد يوميا للإجابة على استفساراتك وحل جميع مشاكلك",
            },
            {
              img: "price-tag.svg",
              title: "عروض مناسبة",
              desc: "نقدم خدمات متنوعة وعروض مناسبة لجميع الأفراد و الشركات بأحدث التقنيات وأفضل جودة",
            },
            {
              img: "buildings.svg",
              title: "وكالات عالمية",
              desc: "لدينا وكالات من شركات عالمية تدعمنا في تحقيق أهداف عملائنا",
            },
          ],
          tools: [
            {
              img: "crm.svg",
              title: "CRM",
              desc: "تتخصص شركة ECOMILLION في (CRM (ODOO لتحسني قدرة الشركات على الإستجابة لعملائها والأحداث الهامة",
            },
            {
              img: "mobile-phone.svg",
              title: "تطبيقات الجوال",
              desc: "يميكنك الحصول على تطبيق للموقع الإلكتروني على جميع المنصات في وقت قياسي بمجرد طلبك للتطبيق من شريكنا ابتدي",
            },
            {
              img: "device.svg",
              title: "موقع للمستقبل",
              desc: "اعين شريكنا ابتدي دائما على المستقبل لذلك نحرص عىل تصميم موقع الكتروني جاهز للتحديثات المستقبلية والتطورات الحديثة",
            },
            {
              img: "marketing.svg",
              title: "التسويق الالكتروني",
              desc: "وقد طورنا الفريق المناسب والتكنولوجيا والإسرتاتيجيات الرقمية للسماح لعمالئنا بالوصول إلى المزيد من العملاء",
            },
            {
              img: "vector.svg",
              title: "إبتكار العلامة التجارية",
              desc: "تعد العلامة التجارية وهوية الشركة أهم الخطوات لبدء وتأسيس عملك. سنقوم بترجمة المبادئ الأساسية لشركتك",
            },
            {
              img: "hosting.svg",
              title: "إستضافة سريعة",
              desc: "شريكنا ابتدي يجعل استضافة الموقع الإلكتروني ذات كفاءة عالية و أسرع سبعة أضعاف وفقا لمعايير فريق مطورين جوجل القياسية",
            },
            {
              img: "seo.svg",
              title: "SEO",
              desc: "البحث هو عملية زيادة جودة وكمية حركة مرور موقع الويب عن طريق زيادة ظهور موقع ويب أو صفحة ويب",
            },
            {
              img: "writing.svg",
              title: "التصميم والإنتاج",
              desc: "نعمل على خلق كل ما هو استنايئ وإبداعي والتصميم هو جزء من ذلك. سوف تحظى بتصميم",
            },
            {
              img: "social-media.svg",
              title: "موقع للمستقبل",
              desc: "نركز عىل تحقيق اهداف نشاطك التجاري بشكل إحترافية من خالل خبرتنا لسنوات في إدارة صفحات التواصل الإجتماعي",
            },
          ],
          hostingFeatures: [
            {
              svg: "surface1",
              title: "سيرفرات موثوقة",
              desc: "أجهزة سيرفرات مبنية على معالجات Intel Xeon فئة E3-V6. ذاكرة عشوائية من النوع DDR4 ECC خطوط أتصال بسرعة 1Gbit/s",
            },
            {
              svg: "binoculars",
              title: "مراقبة لحظية",
              desc: "تخضع جميع السيرفرات لنظام مراقبة دقيق على مدار الساعة. ويتم إصلاح أي أعطال فور ظهورها لضمان أقصى درجات الاستقرار لموقعك",
            },
            {
              svg: "padlock",
              title: "موقعك مؤمن",
              desc: "نظامنا الأمني سيكون كفيل بحماية موقعك بنسبة 90% من الهجمات العشوائية وذلك بفضل قواعد الحماية التي يتم تطبيقها لدينا",
            },
            {
              svg: "backup",
              title: "نسخ احتياطي مجاني",
              desc: "يتم تلقائياً انشاء نسخة احتياطية داخلية لموقعك بالكامل يوميا واسبوعيا وشهريا. بالاضافة الى نسخ خارجي لتطبيق أقصى معدلات الأمان",
            },
            {
              svg: "computer",
              title: "لوحة تحكم cpanel",
              desc: "تحكم في موقعك وإستهلاكة من خلال لوحة تحكم cPanel مع دعم أكثر من 15 لغة من بينهم العربية والأنجليزية كواجهة للمستخدم",
            },
            {
              svg: "cloud",
              title: "نظام CLoud Linux",
              desc: "تقنية LVE في توزيع الموارد بشكل عادل بين المستخدمين, دعم متعدد لإصدارات PHP وحرية إختيار modulus من خلال لوحة التحكم",
            },
            {
              svg: "transfer",
              title: "نقل موقعك مجانا",
              desc: "نقدم لك خدمة نقل موقعك من أي مزود أخر مجاناً وذلك يشمل نقل الملفات وقواعد بيانات الموقع والتأكد من سلامة عمل الموقع",
            },
            {
              svg: "headphones",
              title: "دعم فني مستمر",
              desc: "دعمنا الفني متواجد على مدار الساعة لمعالجة جميع طلباتك والرد على جميع إستفساراتك في مدة ﻻ تزيد عن 30 دقيقة",
            },
          ],
          mobile: {
            fetures: [
              {
                desc: "ايجاد الفكرة المناسبة للتطبيق او تطوير وتحسين الفكرة التي لديك",
              },
              {
                desc: "اعتماد وحجز اسم التطبيق وتصميم الشعار الخاص به",
              },
              {
                desc: "دراسة الفكرة والتاكد من جدوى عملها في السوق المطلوب",
              },
              {
                desc: "بحث ودراسة مميزات وصفحات وشاشات التطبيق وكيف تعمل مع عمل WireFraming",
              },
              {
                desc: "تصميم صفحات التطبيق بشكل احترافي ومناسب",
              },
              {
                desc: "عمل ملف كامل بجميع مايتعلق ب التطبيق وتفاصيله ويمكن عرضه على المستثمرين",
              },
              {
                desc: "برمجة التطبيق بأحدث اللغات البرمجية التي تحقق أسرع اداء وأعلى استقرار",
              },
              {
                desc: "توفير سيرفر خاص بالمواصفات المناسبة لحجم التطبيق",
              },
              {
                desc: "رفع التطبيق على منصة ابستور و بلاي ستور",
              },
              {
                desc: "الدعم الفني الحقيقي والمتواصل باستمرار بعد رفع ونشر التطبيق",
              },
            ],
          },
          crm: {
            property: [
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
              {
                desc: "اسم الخاصية تظهر هنا بشكل مختصر معبرا عن الخاصية",
              },
            ],
            forecasts: [
              {
                icon: "searching",
                desc: "هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية",
              },
              {
                icon: "filter",
                desc: "هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية",
              },
              {
                icon: "statistics",
                desc: "هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية",
              },
            ],
            performance: [
              {
                icon: "phone-call",
                title1: "اولا",
                title2: "الإتصال",
              },
              {
                icon: "calendar",
                title1: "احجز",
                title2: "نسخة تجريبية",
              },
              {
                icon: "computer",
                title1: "نجهز لك",
                title2: "عرض سعر",
              },
              {
                icon: "writing",
                title1: "تتبع",
                title2: "عرض السعر",
              },
            ],
          },
          employees: {
            features: [
              {
                icon: "salary",
                title: "برنامج الأجور والمرتبات",
                desc: "مرتبات الموظفين الثابتة والمتغيرة على حسب طبيعة عمل الموظف وربطها بالمهام والحضور والانصراف والتأمينات و المستقطعات والعلاوات والسلف بالاضافة الى تأثير التقييم الشهرى والمخصصات والبدلات",
              },
              {
                icon: "engineers",
                title: "برنامج شؤون العاملين",
                desc: "قاعدة بيانات كاملة للموظفين وتقارير تقييم العمل والمستويات الوظيفية والوصف الوظيفي والمعاملات المالية للموظف كالسلف والقروض والتسويات كالتأمينات الاجتماعية ومستحقاته الوظيفية",
              },
              {
                icon: "fingerprint-scan",
                title: "برنامج الحضور والانصراف",
                desc: "تثبيت نظام الحضور والانصراف لكل موظف تبعا لنظام وطبيعة عمله سواء كانت بساعات عمل ثابتة أو متغيرة وادخال وإدراج أي استثناءات فى حساب ساعات العمل وربط ماكينات الحضور والانصراف مباشرة",
              },
              {
                icon: "briefcase",
                title: "برنامج التعيينات والفصل",
                desc: "تقييم احتياجات كل قسم من الموظفين والمهارات المطلوبة وقاعدة بيانات كاملة للمتقديمن إلى الوظائف ومتابعة مراحل التقديم والتعيين وتفاصيل عقود العمل وإرسالها بطريقة تلقائية لكل المؤهلين",
              },
              {
                icon: "folder",
                title: "برنامج الاجازات والعطلات",
                desc: "تقويم خاص بـ الاجازات والعطلات الرسمية وتحديد كامل لأنواع الاجازات المتاحة للموظف وكيفية طلب الإجازة وربطها بالمرتب والأرصدة المتاحة لكل موظف سنويا وانظمة ترحيل هذه الإجازات خلال الفترات ان وجد",
              },
              {
                icon: "favorite",
                title: "برنامج تقييم الأداء",
                desc: "تقارير تقييم أداء مختلفة تبعا لطبيعة عمل كل موظف تحتوى على كافة نقاط التقييم تبعا للمهام كل موظف ودرجته الادارية وحجم الأعمال والمسؤوليات الموكلة الية وربط تقارير تقييم الأداء الدورية بالتقيمات السنوية",
              },
              {
                icon: "user",
                title: "برنامج التطوير والتدريب",
                desc: "اختبارات تقييم مهارات الموظفين المطلوبة داخل كل قسم تبعا للمهام المطلوبة منه لإنشاء نظام تدريبى لتطوير هذه المهارات قائم على دورات تدريبية وورش عمل وتقيم نهائي لاستكمال عملية التطوير",
              },
              {
                icon: "social-media",
                title: "برنامج الجزاءات والمكافآت",
                desc: "تحديد مقاييس الأداء التي يتم بناءا عليها عملية المكافئة أو الجزاء لكل موظف تبعا لطبيعة عملة وربطها بنظام المرتبات الخاص بة وربطها أيضا بالتقييم الدورى للموظف المتواجد في المؤسسة",
              },
              {
                icon: "computer",
                title: "برنامج المهام والمشروعات",
                desc: "تكليف الموظفين بالمهام الخاصة بهم تبعا للخطة الموضوعة وتقييم الاطار الزمنى ودرجة كفاءة تنفيذ هذة المهام وربطها بالمهام الاجمالية للمشروع ونسبة الانتهاء من كل مهمة تبعا للمخطط الموضوع مسبقا",
              },
            ],
            featuresOdoo: [
              {
                icon: "translate",
                desc: "البرنامج بيدعم اكتر من لغة على حسب متطلبات او جنسية العميل",
              },
              {
                icon: "security",
                desc: "البرنامج أمن تماما بالنسبية لسرية بيانات العملاء والتحويلات المالية بداخلة",
              },
              {
                icon: "world-grid",
                desc: "البرنامج بيعمل من خلال الانترنت حيث يمكن الولوج الية من خلال الموبايل سواء للعميل او الموظف",
              },
              {
                icon: "controls",
                desc: "امكانية تعديل وتغير صلاحيات مستخدمى البرنامج على حسب رغبة صاحب العمل",
              },
              {
                icon: "home-control",
                desc: "لبرنامج سهل التعامل ويدعم كافة انظمة التشغيل ويمكن ربطة بأى برنامج داخلى للشركة",
              },
              {
                icon: "refresh",
                desc: "لبرنامج سهل التعامل ويدعم كافة انظمة التشغيل ويمكن ربطة بأى برنامج داخلى للشركة",
              },
            ],
          },
          socialMedia: {
            features: [
              {
                icon: "vector",
                title: "بناء العلامة التجارية",
              },
              {
                icon: "sketch",
                title: "بناء العلامة الشخصية",
              },
              {
                icon: "device",
                title: "إنشاء موقع إجترافي",
              },
              {
                icon: "advertising",
                title: "تفعيل مدير الإعلانات",
              },
              {
                icon: "link",
                title: "ربط البيكسل",
              },
              {
                icon: "marketing",
                title: "الترويج",
              },
              {
                icon: "analysis",
                title: "التحليل",
              },
              {
                icon: "efficiency",
                title: "مؤشرات قياس الأداء",
              },
              {
                icon: "layer",
                title: "أدوات إحترافية",
              },
            ],
          },
          googleAdvertising: {
            features: [
              {
                icon: "search2",
                title: "Search Ads",
              },
              {
                icon: "connection",
                title: "display network",
              },
              {
                icon: "price-tag",
                title: "shopping ads",
              },
              {
                icon: "video-marketing",
                title: "video ads",
              },
              {
                icon: "speedometer",
                title: "kpis",
              },
              {
                icon: "pie-chart",
                title: "google analytics",
              },
            ],
          },
          optimizeSeo: {
            property: [
              {
                title: "زيادة حركة المرور",
              },
              {
                title: "عائد الإستثمار",
              },
              {
                title: "الوعي بالعلامة التجارية",
              },
              {
                title: "الفعالية من حيث التكلفة",
              },
              {
                title: "زيادة قابلية إستخدام الموقع",
              },
              {
                title: "تحسين تجربة المستخدم",
              },
            ],
            features: [
              {
                icon: "statistics2",
                title: "Technical SEO",
              },
              {
                icon: "seo",
                title: "On-Page SEO",
              },
              {
                icon: "search",
                title: "المحتوى SEO",
              },
              {
                icon: "offpage",
                title: "Off-Page SEO",
              },
              {
                icon: "seo2",
                title: "المحلي SEO",
              },
              {
                icon: "mobile-phone",
                title: "Mobile SEO",
              },
              {
                icon: "seotrade",
                title: "التجارة اإللكترونية SEO",
              },
              {
                icon: "speedometer",
                title: "مؤشرات قياس الأداء",
              },
              {
                icon: "layer",
                title: "أدوات احترافية",
              },
            ],
          },
          brandBuilding: {
            features: [
              {
                icon: "domain-registration",
                title: "الإسم والدومين",
              },
              {
                icon: "vector",
                title: "تصميم العلامة التجارية",
              },
              {
                icon: "sketch",
                title: "تصميم الشعار",
              },
              {
                icon: "create",
                title: "رسومات الشعار",
              },
              {
                icon: "redesign",
                title: "إعادة تصميم الهوية التجارية",
              },
              {
                icon: "support",
                title: "إستشارات",
              },
            ],
          },
          trainingConsulting: {
            features: [
              {
                icon: "trade",
                title: "أساسيات التجارة الإلكترونية",
              },
              {
                icon: "shopping",
                title: "شراء منتجات مربحة",
              },
              {
                icon: "price-tag",
                title: "التسعير",
              },
              {
                icon: "store",
                title: "إدارة المتجر بالكامل",
              },
              {
                icon: "megaphone",
                title: "التسويق الإلكتروني",
              },
              {
                icon: "social-media",
                title: "إدارة مواقع التواصل",
              },
              {
                icon: "vector",
                title: "بناء العلامة التجارية",
              },
              {
                icon: "interface",
                title: "والمزيد",
              },
            ],
          },
          slider: [
            "abqary.png",
            "fat.png",
            "ki.png",
            "man.png",
            "mas.png",
            "vh.png",
          ],
          blog: [
            "05.png",
            "06.png",
            "07.png",
            "08.png",
            "05.png",
            "06.png",
            "07.png",
            "08.png",
          ],
        },
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
}

exports.includeHTML = includeHTML;

exports.default = async function () {
  // Init serve files from the build folder
  server.init({
    server: {
      baseDir: paths.scripts.dest,
    },
  });
  // Build and reload at the first time
  buildAndReload();
  // Watch task
  watch(
    ["./*.html", "./views/**/*.html", "src/**/*.*"],
    series(buildAndReload)
  );
};
