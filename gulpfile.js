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
              desc:
                "من خالل مدونة طبية خاصة لعملائك يتمكن فريق العمل الطبي من نشر محتوى طبي تثقيفي بأسلوب شيق جذاب",
            },
            {
              symbol: "",
              img: "1.jpg",
              title: "موقع للمستقبل",
              desc:
                "اعين شريكنا ابتدي دائما على المستقبل لذلك نحرص عىل تصميم موقع الكتروني جاهز للتحديثات المستقبلية والتطورات الحديثة",
            },
            {
              symbol: "",
              img: "1.jpg",
              title: "إبتكار العلامة التجاريةروض مناسبة",
              desc:
                "تعد العلامة التجارية وهوية الشركة أهم الخطوات لبدء وتأسيس عملك. سنقوم بترجمة المبادئ الأساسية لشركتك",
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
              desc:
                "نقدم دعم فني حقيقي متواجد يوميا للإجابة على استفساراتك وحل جميع مشاكلك",
            },
            {
              img: "price-tag.svg",
              title: "عروض مناسبة",
              desc:
                "نقدم خدمات متنوعة وعروض مناسبة لجميع الأفراد و الشركات بأحدث التقنيات وأفضل جودة",
            },
            {
              img: "buildings.svg",
              title: "وكالات عالمية",
              desc:
                "لدينا وكالات من شركات عالمية تدعمنا في تحقيق أهداف عملائنا",
            },
          ],
          tools: [
            {
              img: "crm.svg",
              title: "CRM",
              desc:
                "تتخصص شركة ECOMILLION في (CRM (ODOO لتحسني قدرة الشركات على الإستجابة لعملائها والأحداث الهامة",
            },
            {
              img: "mobile-phone.svg",
              title: "تطبيقات الجوال",
              desc:
                "يميكنك الحصول على تطبيق للموقع الإلكتروني على جميع المنصات في وقت قياسي بمجرد طلبك للتطبيق من شريكنا ابتدي",
            },
            {
              img: "device.svg",
              title: "موقع للمستقبل",
              desc:
                "اعين شريكنا ابتدي دائما على المستقبل لذلك نحرص عىل تصميم موقع الكتروني جاهز للتحديثات المستقبلية والتطورات الحديثة",
            },
            {
              img: "marketing.svg",
              title: "التسويق الالكتروني",
              desc:
                "وقد طورنا الفريق المناسب والتكنولوجيا والإسرتاتيجيات الرقمية للسماح لعمالئنا بالوصول إلى المزيد من العملاء",
            },
            {
              img: "vector.svg",
              title: "إبتكار العلامة التجارية",
              desc:
                "تعد العلامة التجارية وهوية الشركة أهم الخطوات لبدء وتأسيس عملك. سنقوم بترجمة المبادئ الأساسية لشركتك",
            },
            {
              img: "hosting.svg",
              title: "إستضافة سريعة",
              desc:
                "شريكنا ابتدي يجعل استضافة الموقع الإلكتروني ذات كفاءة عالية و أسرع سبعة أضعاف وفقا لمعايير فريق مطورين جوجل القياسية",
            },
            {
              img: "seo.svg",
              title: "SEO",
              desc:
                "البحث هو عملية زيادة جودة وكمية حركة مرور موقع الويب عن طريق زيادة ظهور موقع ويب أو صفحة ويب",
            },
            {
              img: "writing.svg",
              title: "التصميم والإنتاج",
              desc:
                "نعمل على خلق كل ما هو استنايئ وإبداعي والتصميم هو جزء من ذلك. سوف تحظى بتصميم",
            },
            {
              img: "social-media.svg",
              title: "موقع للمستقبل",
              desc:
                "نركز عىل تحقيق اهداف نشاطك التجاري بشكل إحترافية من خالل خبرتنا لسنوات في إدارة صفحات التواصل الإجتماعي",
            },
          ],
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
