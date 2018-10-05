module.exports = function(classObj) {
  var schoolCode = classObj.code.split("-").slice(0, 2).join("-"),
      classCode = classObj.code,
      book = [6, 7];

  // 마포ECC 스페인반 9월에 1권 시작
  if(classCode == "B00130-K1-KC6") {
    book = [2, 3];
  }
  // 영통ECC 오렌지반 9월에 1권 시작
  if(classCode == "B00041-K1-KC8") {
    book = [2, 3];
  }
  // 참사랑어린이집, 꽃내음어린이집 늑대와여우 태블릿(IE) 용량 문제로 본 진도 한권씩만
  if(schoolCode == "A00059-K1" || schoolCode == "A00059-K2") {
    book = [7];
  }
  // 인천 동심유치원 9월 5호 오픈 요청
  if(schoolCode == "C00194-K4") {
    book = [5, 5.5];
  }
  // 초록나라 영재유치원 8월말 3호 오픈 요청
  if(schoolCode == "C00175-K4") {
    book = [4, 5];
  }
  // 초록나라 예원유치원 9월말 6호 오픈 요청
  if(schoolCode == "C00175-K1") {
    book = [5.5, 6];
  }
  // 안산지사 엠에스에듀 8월말 4호 오픈 요청
  if(schoolCode == "C00188-K2") {
    book = [5, 5.5];
  }
  // 청라ECC 초등반 2개는 3월에 C-6부터 시작
  if(classCode == "B00016-K1-KC6" || classCode == "B00016-K1-KC7") {
    book = [10.5];
  }
  // 청라ECC 브라운반 9월에 1권부터 시작
  if(classCode == "B00016-K1-KC8") {
    book = [2, 3];
  }
  // 양주ECC 여름 특강반 8월에 9,10권
  if(classCode == "B00171-K1-KC2") {
    book = [10, 10.5];
  }
  // 양주ECC 12월 1권부터 시작, 3월말에 4권, 6월에 5권
  if(schoolCode == "B00171-K1") {
    book = [7, 8];
  }
  // 제천지사 창의놀이유치원 영업부 시흥지사 낙원유치원, 서초PSA 5월에 1,2권
  if(schoolCode == "C00204-K1" || schoolCode == "C00175-K3" || schoolCode == "D00127-K1") {
    book = [5.5, 6];
  }
  // 인천지사 참조은 유치원 7월에 1권
  if(schoolCode == "C00194-K1") {
    book = [3, 4];
  }
  // 압구정 PSA는 3달치 제공
  if(schoolCode == "D00121-K1") {
    book = [5.5, 6, 7];
  }
  // YBM영업부(내부용)
  if(schoolCode == "A00083-K3") {
    book = [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10, 10.5];
  }
  // 영업용(시범교육 1,3,5권)
  if(schoolCode == "A00083-K5") {
    book = [1, 3, 5, 7];
  }
  // 개발용(2017전권+2018리뉴얼)
  if(schoolCode == "A00083-K6") {
    book = [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10, 10.5];
  }
  // 영업용(시범교육 영문 3,5,7,8권)
  if(schoolCode == "A00083-K7") {
    book = [3, 5, 7, 8];
  }

  book = book.map(function(num) {
    var bookCode = {
      "1": "1-re",
      "2": "2-re",
      "3": "3-re",
      "4": "4-re",
      "5": "5-re",
      "5.5": "5-5-re",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "10.5": "10-5",
    }[String(num)] || num;
    return classObj.level + "-" + bookCode;
  }).join(",");
  // 숙명키즈 파랑반(8세) 시범용 컨텐츠
  if(classCode == "A00083-K4-KC10") {
    book = "A-Test,B-Test,C-Test";
  }
  // 대구지사 소속원, 이유경 테스트 계정에 테스트 컨텐츠 추가
  if(schoolCode.slice(0,6) == "C00071" || schoolCode.slice(0,6) == "C00176") {
    book += "," + classObj.level + "-Test";
  }
  // 잉글루 본사 제공용
  if(schoolCode == "A00083-K11") {
    book = "CHO-A-1,CHO-A-2";
  }
    // 키즈코딩 테스트 0917
  if(schoolCode == "A00083-K12") {
    book = "CHO-A-1,CHO-A-2,CHO-A-3,CHO-A-4,CHO-A-5,CHO-A-6,CHO-A-7,CHO-A-8,CHO-A-9,CHO-A-10,CHO-A-11,CHO-A-12";
  }
  return book;
}
