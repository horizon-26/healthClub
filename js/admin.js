/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-03-08 11:18:41
 * @version $Id$
 */


// 选项全部选中后 即全选也选中
	function allchk(){
	var chknum = $("#list :checkbox").size();//选项总个数
	var chk = 0;
	$("#list :checkbox").each(function () {
        if($(this).prop("checked")==true){
			chk++;
		}
    });
	if(chknum==chk){
		// 选项全部选中，即全选
		$("#allCheck").prop("checked",true);
	}else{
		//不全选
		$("#allCheck").prop("checked",false);
	}
}
